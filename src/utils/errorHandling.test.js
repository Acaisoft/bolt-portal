import {
  getFirstError,
  parseGraphqlResponseError,
  parseGraphqlException,
} from './errorHandling'

const responseErrors = [
  { message: 'response error 1' },
  { message: 'response error 2' },
]
const data = { user: { id: 1 } }
const networkError = {
  result: {
    errors: [{ message: 'network result error' }],
  },
  message: 'network error',
}
const networkErrorWithoutResult = {
  message: 'network error',
}

describe('utils: errorHandling', () => {
  describe('getFirstError', () => {
    test('return the first error message', () => {
      const errors = responseErrors
      expect(getFirstError(errors)).toBe('response error 1')
    })

    test('return null on invalid/empty errors', () => {
      expect(getFirstError([])).toBe(null)
      expect(getFirstError(null)).toBe(null)
      expect(getFirstError(undefined)).toBe(null)
      expect(getFirstError(1)).toBe(null)
      expect(getFirstError('something')).toBe(null)
    })
  })

  describe('parseGraphqlResponseError', () => {
    test('get the first error', () => {
      const response = { errors: responseErrors, data }
      expect(parseGraphqlResponseError(response)).toBe('response error 1')
    })

    test('get null when there are no errors', () => {
      const response = { data }
      expect(parseGraphqlResponseError(response)).toBe(null)
    })

    test('get null when the response is invalid', () => {
      expect(parseGraphqlResponseError({})).toBe(null)
      expect(parseGraphqlResponseError(null)).toBe(null)
      expect(parseGraphqlResponseError(undefined)).toBe(null)
      expect(parseGraphqlResponseError(1)).toBe(null)
      expect(parseGraphqlResponseError('something')).toBe(null)
    })
  })

  describe('parseGraphqlException', () => {
    test('get the first graphql error', () => {
      const ex = {
        graphQLErrors: responseErrors,
        networkError,
        message: 'exception message',
      }
      expect(parseGraphqlException(ex)).toBe('response error 1')
    })

    test('get the first network response error', () => {
      const ex = {
        graphQLErrors: [],
        networkError,
        message: 'exception message',
      }
      expect(parseGraphqlException(ex)).toBe('network result error')
    })

    test('get the network error', () => {
      const ex = {
        graphQLErrors: [],
        networkError: networkErrorWithoutResult,
        message: 'exception message',
      }
      expect(parseGraphqlException(ex)).toBe('network error')
    })

    test('get the exception error', () => {
      const ex = {
        graphQLErrors: [],
        networkError: {},
        message: 'exception message',
      }
      expect(parseGraphqlException(ex)).toBe('exception message')
    })

    test('get null for invalid exception', () => {
      expect(parseGraphqlException({})).toBe(null)
      expect(parseGraphqlException(null)).toBe(null)
      expect(parseGraphqlException(undefined)).toBe(null)
      expect(parseGraphqlException(1)).toBe(null)
      expect(parseGraphqlException('something')).toBe(null)
    })
  })
})
