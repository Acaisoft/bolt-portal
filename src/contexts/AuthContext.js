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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const syncAuthState = useCallback(async () => {
    setIsSyncing(true)
    setIsAuthenticated(client.getIsAuthenticated())
    setToken(client.getToken())
    setUser(await client.getUser())
    setIsSyncing(false)
  }, [client])

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
      isAuthenticated,
      user,
      token,
      login,
      logout,
    }
  }, [isSyncing, isInitialized])

  return <Provider value={context}>{children}</Provider>
}

export { AuthContext, Consumer as AuthConsumer, StatefulProvider as AuthProvider }
