import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage,
})

const errorHandlingLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    //TODO: check errors and delete localstorage if necessary
    console.log('error:', graphQLErrors)
    // client.writeData({ data: { isAuthorized: false } })
  }
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

const localStateLink = withClientState({
  defaults: {
    isAuthorized: true, //TODO: isAuthorized: token !== initToken ? true : false
    currentProject: null,
  },
  cache,
})

const client = new ApolloClient({
  link: ApolloLink.from([errorHandlingLink, requestLink, localStateLink, link]),
  cache,
})

export default client
