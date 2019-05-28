import gql from 'graphql-tag'

export const SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION = gql`
  subscription subscribeToExecutionResultsDistribution($executionId: uuid!) {
    resultsPerEndpoint: execution_request_totals(
      where: { execution_id: { _eq: $executionId } }
    ) {
      identifier
      method
      name
      timestamp

      requests_per_second
      num_failures
      num_requests
      min_response_time
      average_response_time
      max_response_time
    }
  }
`
