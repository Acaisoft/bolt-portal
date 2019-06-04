import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  createContext,
} from 'react'

const AuthKeycloakContext = createContext(null)
const { Provider, Consumer } = AuthKeycloakContext

function StatefulProvider({ children, client }) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const [state, setState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  })

  const syncAuthState = useCallback(async () => {
    if (!isSyncing) {
      setIsSyncing(true)
      setState({
        isAuthenticated: client.getIsAuthenticated(),
        token: client.getToken(),
        user: await client.getUser(),
      })
      setIsSyncing(false)
    }
  }, [client, isSyncing])

  const login = useCallback(async (...args) => {
    await client.login(...args)
    syncAuthState()
  }, [])

  const logout = useCallback(async (...args) => {
    await client.logout(...args)
    syncAuthState()
  }, [])

  useEffect(() => {
    client.registerOnTokenExpired({
      minValidity: 5,
      onSuccess: refreshed => {
        if (refreshed) {
          syncAuthState()
        }
      },
      onError: () => {
        syncAuthState()
      },
    })
  }, [])

  useEffect(() => {
    // useEffect callback cannot be async, but the function inside can.
    // We fire it only once anyway.
    async function initializeClient() {
      await client.init()
      await syncAuthState()
      setIsInitialized(true)
    }

    initializeClient()
  }, [])

  const context = useMemo(() => {
    return {
      isSyncing,
      isInitialized,
      login,
      logout,
      getToken: client.getToken,
      ...state,
    }
  }, [isSyncing, isInitialized])

  return <Provider value={context}>{children}</Provider>
}

export {
  AuthKeycloakContext,
  Consumer as AuthKeycloakConsumer,
  StatefulProvider as AuthKeycloakProvider,
}
