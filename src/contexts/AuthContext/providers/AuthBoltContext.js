import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { AUTH_TOKEN_NAME } from 'config/constants'
import { redirectToExternalLoginPage } from 'utils/router'

const AuthBoltContext = createContext(null)

const fetchToken = async logout => {
  return await axios
    .get(`${process.env.REACT_APP_AUTH_SERVICE_BASE_URL}/session`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch(() => logout())
}

const requestToken = async logout => {
  const resp = await fetchToken(logout)
  if (!resp?.AUTH_TOKEN) return logout()

  const token = resp?.AUTH_TOKEN
  localStorage.setItem(AUTH_TOKEN_NAME, token)

  return token
}

function AuthBoltProvider({ children }) {
  const [hasToken, setHasToken] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_NAME)
    return redirectToExternalLoginPage()
  }, [])

  const getToken = useCallback(async () => {
    let token = localStorage.getItem(AUTH_TOKEN_NAME)
    if (!token) token = await requestToken(logout)
    setHasToken(true)

    try {
      const { exp: expires, given_name: firstName } = jwtDecode(token)
      const isExpired = Date.now() >= expires * 1000
      if (isExpired) return logout()

      setIsAuthenticated(true)
      setUser({ firstName })
      setIsInitialized(true)

      return token
    } catch (e) {
      console.error(e)
      return logout()
    }
  }, [logout])

  useEffect(() => {
    async function initAuth() {
      await getToken()
    }

    initAuth()
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
