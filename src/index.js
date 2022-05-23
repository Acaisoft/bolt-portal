import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from 'contexts/AuthContext'
import Config from 'services/Config'
import AuthApolloProvider from 'services/GraphQL/AuthApolloProvider'
import * as serviceWorker from './serviceWorker'

const root = createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <AuthApolloProvider>
      <App />
    </AuthApolloProvider>
  </AuthProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

window.__version = Config.version
