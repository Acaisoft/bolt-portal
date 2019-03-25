import gql from 'graphql-tag'
export default gql`
  query getExecutionResultsDistribution($executionId: uuid!) {
    result_distribution(where: { execution_id: { _eq: $executionId } }) {
      id
      request_result
      distribution_result
    }
  }
`
