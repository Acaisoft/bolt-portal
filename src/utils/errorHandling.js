import _ from 'lodash'

export function getFirstError(errors) {
  if (Array.isArray(errors) && errors.length > 0) {
    return errors[0].message
  }

  return null
}

export function parseGraphqlResponseError(response) {
  return getFirstError(_.get(response, 'errors'))
}

export function parseGraphqlException(ex) {
  if (!ex) {
    return null
  }

  return (
    getFirstError(_.get(ex, 'graphQLErrors')) ||
    getFirstError(_.get(ex, 'networkError.result.errors')) ||
    _.get(ex, 'networkError.message') ||
    ex.message ||
    null
  )
}
