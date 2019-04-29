import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import apolloClient from '~services/GraphQL/client'
import App from './App'

import Config from '~services/Config/Config'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

window.__version = Config.version
