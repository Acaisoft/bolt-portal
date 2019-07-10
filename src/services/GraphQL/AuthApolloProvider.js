import React, { useContext, useMemo } from 'react'

import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

import { AuthKeycloakContext } from '~contexts'
import {
  makeErrorHandlingLink,
  makeRequestLink,
  makeTransportLinks,
  makeCache,
} from './handlers'

function AuthApolloProvider({ children }) {
  const auth = useContext(AuthKeycloakContext)

  const client = useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([
          makeErrorHandlingLink(),
          makeRequestLink(),
          makeTransportLinks({
            getFreshToken: auth.getFreshToken,
            getToken: auth.getToken,
          }),
        ]),
        cache: makeCache(),
      }),
    [auth.getFreshToken, auth.getToken]
  )

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default AuthApolloProvider
