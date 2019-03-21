import gql from 'graphql-tag'

export default gql`
  query getExecutionDistributions($executionId: uuid!) {
    result_distribution(where: { execution_id: { _eq: $executionId } }) {
      id
      execution_id
      distribution_result
      request_result
    }
  }
`
