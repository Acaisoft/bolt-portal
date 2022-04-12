import { HttpLink, ApolloLink, Observable } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'

import Config from 'services/Config'

/*
 * Links
 */
export function makeErrorHandlingLink() {
  return onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations = [], path = '' }) => {
        const parsedLocations = locations
          .map(l => `(${l.line}:${l.column})`)
          .join(',')

        console.log(
          `[GraphQL error] Error: ${message}`,
          parsedLocations && `, Locations: ${parsedLocations}`,
          path && `, Path: ${path}`,
          `\nFor operation: ${
            operation.operationName || '[no name]'
          } with variables: ${JSON.stringify(operation.variables)}`
        )
      })
    }

    if (networkError) {
      const { name, message, response, result } = networkError
      console.log(`[Network error] ${name}: ${message}`, { response, result })
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

export function makeTransportLinks({ getFreshToken, getToken }) {
  const wsLink = new WebSocketLink({
    uri: Config.hasura.wsUri,
    options: {
      lazy: true,
      reconnect: true,
      reconnectionAttempts: 3,
      connectionParams: async () => {
        const token = await getFreshToken(20)

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
