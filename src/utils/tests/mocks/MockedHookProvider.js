import React from 'react'

import { MockLink } from 'react-apollo/test-links'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo-hooks'

function createClient({ mocks = [], addTypename = false } = {}) {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename }),
    link: new MockLink(mocks, addTypename),
  })
}

export default function MockedHookProvider({ children, mocks, addTypename }) {
  return (
    <ApolloProvider client={createClient({ mocks, addTypename })}>
      {children}
    </ApolloProvider>
  )
}
