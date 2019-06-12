import React, { useEffect, useState, useMemo, createContext } from 'react'

const AuthKeycloakContext = createContext(null)
const { Provider, Consumer } = AuthKeycloakContext

function StatefulProvider({ children, client }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [shouldSync, setShouldSync] = useState(false)

  const [state, setState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  })

  // Initial setup
  useEffect(() => {
    client.registerOnTokenExpired({
      minValidity: 5,
      onSuccess: refreshed => {
        if (refreshed) {
          setShouldSync(true)
        }
      },
      onError: () => {
        setShouldSync(true)
      },
    })

    // useEffect callback cannot be async, but the function inside can.
    // We fire it only once anyway.
    async function initializeClient() {
      await client.init()
      setShouldSync(true)
    }

    initializeClient()
  }, [client])

  // Synchronize client state when necessary
  useEffect(() => {
    if (shouldSync) {
      async function synchronize() {
        setState({
          isAuthenticated: client.getIsAuthenticated(),
          token: client.getToken(),
          user: await client.getUser(),
        })
        setShouldSync(false)
        setIsInitialized(true)
      }

      synchronize()
    }
  }, [client, shouldSync])

  // Save the current auth state and pass it to the consumers.
  // Memoize to avoid unnecessary re-renders of the whole app.
  const context = useMemo(() => {
    async function login(...args) {
      await client.login(...args)
      setShouldSync(true)
    }

    async function logout(...args) {
      await client.logout(...args)
      setShouldSync(true)
    }

    return {
      isSyncing: shouldSync,
      isInitialized,
      login,
      logout,
      getToken: client.getToken,
      ...state,
    }
  }, [shouldSync, isInitialized, client, state])

  return <Provider value={context}>{children}</Provider>
}

export {
  AuthKeycloakContext,
  Consumer as AuthKeycloakConsumer,
  StatefulProvider as AuthKeycloakProvider,
}
