import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

/*
 * Links
 */
const errorHandlingLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    //TODO: check errors and delete localstorage if necessary
    // client.writeData({ data: { isAuthorized: false } })
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

//TODO - init token is necessary?
// const initToken = ''
// const token = localStorage.getItem('token') || initToken

const request = async operation => {
  // const authToken = localStorage.getItem('token') || initToken
  operation.setContext({
    headers: {
      'X-Hasura-Access-Key': 'FF662305FF444E1CB81BB1D7DD310BC0',
      // Authorization: token ? `Bearer ${authToken}` : '',
    },
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const wsLink = new WebSocketLink({
  uri: `wss://hasura.dev.bolt.acaisoft.io/v1alpha1/graphql`,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: async () => {
      // const authToken = localStorage.getItem('token') || initToken
      return {
        headers: {
          'X-Hasura-Access-Key': 'FF662305FF444E1CB81BB1D7DD310BC0',
          // Authorization: token ? `Bearer ${authToken}` : '',
        },
      }
    },
  },
})
const httpLink = new HttpLink({
  uri: 'https://hasura.dev.bolt.acaisoft.io/v1alpha1/graphql',
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

/*
 * Cache & Local State
 */
const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage,
})

cache.writeData({
  data: {
    isAuthorized: true,
    currentProject: null,
  },
})

/*
 * Client
 */
const client = new ApolloClient({
  link: ApolloLink.from([errorHandlingLink, requestLink, link]),
  cache,
})

export default client
