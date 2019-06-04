import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { AuthKeycloakProvider } from '~contexts'
import Config from '~services/Config'
import AuthKeycloak from '~services/AuthKeycloak'
import AuthApolloProvider from '~services/GraphQL/AuthApolloProvider'

import * as serviceWorker from './serviceWorker'

const keycloak = new AuthKeycloak(Config.keycloak)

ReactDOM.render(
  <AuthKeycloakProvider client={keycloak}>
    <AuthApolloProvider>
      <App />
    </AuthApolloProvider>
  </AuthKeycloakProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

window.__version = Config.version
