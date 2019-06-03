import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'

import Config from '~services/Config'

/*
 * Links
 */
export function makeErrorHandlingLink() {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      console.log('[Network error]', networkError)
    }
  })
}

export function makeRequestLink() {
  return new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) {
            handle.unsubscribe()
          }
        }
      })
  )
}

export function makeTransportLinks(getToken) {
  const wsLink = new WebSocketLink({
    uri: Config.hasura.wsUri,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        const token = await getToken()

        if (token) {
          return {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        }
      },
    },
  })
  const httpLink = new HttpLink({
    uri: Config.hasura.apiUri,
  })

  const authLink = setContext(async (operation, prevContext) => {
    const token = await getToken()

    if (token) {
      return {
        headers: {
          ...prevContext.headers,
          authorization: `Bearer ${token}`,
        },
      }
    }
  })

  return authLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )
}

/*
 * Cache & Local State
 */
export function makeCache() {
  const cache = new InMemoryCache()

  persistCache({
    cache,
    storage: window.localStorage,
  })

  return cache
}
