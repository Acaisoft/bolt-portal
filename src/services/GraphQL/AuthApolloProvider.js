import React, { useContext, useEffect, useMemo } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'

import { AuthKeycloakContext } from 'contexts'
import {
  makeErrorHandlingLink,
  makeRequestLink,
  makeTransportLinks,
} from './handlers'

const cache = new InMemoryCache()

function AuthApolloProvider({ children }) {
  const auth = useContext(AuthKeycloakContext)

  // I don't think that we need to put our cache results in local storage when we have apollo client devtools to inspect cache
  useEffect(() => {
    async function initCache() {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      })
    }

    initCache()
  }, [])

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
        cache,
      }),
    [auth.getFreshToken, auth.getToken]
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthApolloProvider
