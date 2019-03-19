import gql from 'graphql-tag'

export default gql`
  fragment executionForList on execution {
    id
    start
    status
    configuration {
      id
      name
      configuration_type {
        name
      }
      project {
        id
        name
      }
    }
    result_aggregate_aggregate {
      aggregate {
        count
        sum {
          number_of_successes
          number_of_fails
        }
      }
    }
  }
`
