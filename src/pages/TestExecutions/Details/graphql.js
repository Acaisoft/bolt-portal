import gql from 'graphql-tag'

const EXECUTION_TIME_PARAMETER_FRAGMENT = gql`
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

export const GET_EXECUTION = gql`
  query getExecution($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      start
      start_locust
      end_locust
      configuration {
        id
        name
      }
      ...executionTimeParameter
    }
  }

  ${EXECUTION_TIME_PARAMETER_FRAGMENT}
`

export const GET_EXECUTION_RESULTS_PER_TICK = gql`
  query getExecutionResultsPerTick($executionId: uuid!) {
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

  ${EXECUTION_TIME_PARAMETER_FRAGMENT}
`

export const GET_EXECUTION_RESULTS_DISTRIBUTION = gql`
  query getExecutionResultsDistribution($executionId: uuid!) {
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
