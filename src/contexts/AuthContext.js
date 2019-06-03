import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  createContext,
} from 'react'

const AuthContext = createContext(null)
const { Provider, Consumer } = AuthContext

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

export { AuthContext, Consumer as AuthConsumer, StatefulProvider as AuthProvider }
