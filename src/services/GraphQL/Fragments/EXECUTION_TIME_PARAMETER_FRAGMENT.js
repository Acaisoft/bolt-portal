import gql from 'graphql-tag'

export default gql`
  fragment executionTimeParameter on execution {
    configuration {
      id
      configuration_parameters(where: { parameter: { name: { _eq: "time" } } }) {
        id
        value
      }
    }
  }
`
