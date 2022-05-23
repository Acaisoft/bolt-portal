import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { AUTH_COOKIE_NAME } from 'config/constants'
import { redirectToExternalLoginPage } from 'utils/router'

const AuthBoltContext = createContext(null)

function AuthBoltProvider({ children }) {
  const [hasToken, setHasToken] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const logout = useCallback(() => {
    Cookies.remove(AUTH_COOKIE_NAME, { path: '/', domain: window.location.hostname })
    return redirectToExternalLoginPage()
  }, [])

  const getToken = useCallback(() => {
    const token = Cookies.get(AUTH_COOKIE_NAME)
    if (!token) return logout()

    setHasToken(true)

    try {
      const { exp: expires, given_name: firstName } = jwtDecode(token)
      const isExpired = Date.now() >= expires * 1000
      if (isExpired) return logout()

      setIsAuthenticated(true)
      setUser({ firstName })

      return token
    } catch (e) {
      console.error(e)
      return logout()
    }
  }, [logout])

  useEffect(() => {
    setIsInitialized(true)
    getToken()
  }, [getToken])

  const context = useMemo(
    () => ({
      getToken,
      logout,
      user,
      isAuthenticated,
      isInitialized,
      hasToken,
    }),
    [getToken, logout, user, isAuthenticated, isInitialized, hasToken]
  )

  return (
    <AuthBoltContext.Provider value={context}>{children}</AuthBoltContext.Provider>
  )
}

export { AuthBoltContext, AuthBoltProvider }
