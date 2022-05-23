import { useContext } from 'react'
import { AuthServiceName } from 'config/constants'
import Config from 'services/Config'
import AuthKeycloak from 'services/AuthKeycloak'
import {
  AuthBoltContext,
  AuthKeycloakContext,
  AuthBoltProvider,
  AuthKeycloakProvider,
} from './providers'

const keycloak = new AuthKeycloak(Config.keycloak)

export function AuthProvider({ children }) {
  const authService = process.env.REACT_APP_AUTH_SERVICE || AuthServiceName.BOLT

  if (authService === AuthServiceName.KEYCLOAK)
    return <AuthKeycloakProvider client={keycloak}>{children}</AuthKeycloakProvider>
  if (authService === AuthServiceName.BOLT)
    return <AuthBoltProvider>{children}</AuthBoltProvider>

  return <p>Auth provider {authService} not implemented</p>
}

export function useAuth() {
  const authService = process.env.REACT_APP_AUTH_SERVICE || AuthServiceName.BOLT

  const authContext =
    authService === AuthServiceName.KEYCLOAK
      ? AuthKeycloakContext
      : authService === AuthServiceName.BOLT
      ? AuthBoltContext
      : null

  const context = useContext(authContext)
  if (context === undefined) {
    throw new Error(`Auth provider ${authService} not implemented`)
  }

  return context
}
