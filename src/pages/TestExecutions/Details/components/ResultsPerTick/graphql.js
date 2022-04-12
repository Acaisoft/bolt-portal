import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_EXECUTION_RESULTS_PER_TICK = gql`
  subscription subscribeToExecutionResultsPerTick($executionId: uuid!) {
    resultsPerTick: result_aggregate(
      where: { execution_id: { _eq: $executionId } }
      order_by: { timestamp: asc }
    ) {
      id
      number_of_fails
      number_of_successes
      number_of_users
      average_response_time
      timestamp
    }
  }
`
