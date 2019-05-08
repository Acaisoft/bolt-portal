import gql from 'graphql-tag'

export const GET_CONFIGURATION = gql`
  query getConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
      id
      name
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
    }
  }
`
export const GET_ENDPOINT = gql`
  query getEndpoint($endpointId: String!) {
    endpointTotals: execution_request_totals(
      where: { identifier: { _eq: $endpointId } }
    ) {
      identifier
      method
      name
      num_failures
      num_requests
      min_response_time
      average_response_time
      max_response_time
      min_content_size
      average_content_size
      max_content_size
    }
  }
`

export const GET_ENDPOINT_DISTRIBUTION = gql`
  query getEndpointDistribution($endpointId: String!) {
    endpointDistribution: execution_distribution(
      where: { identifier: { _eq: $endpointId } }
      limit: 1
      order_by: { timestamp: desc }
    ) {
      id
      identifier
      p100
      p99
      p95
      p90
      p80
      p75
      p66
      p50
    }
  }
`

export const GET_ENDPOINT_ERRORS = gql`
  query getEndpointErrors($endpointId: String!) {
    endpointErrors: execution_errors(
      where: {
        # execution_id: { _eq: $executionId }
        # _and: {
        identifier: { _eq: $endpointId }
        # }
      }
      distinct_on: exception_data
      order_by: { exception_data: asc, timestamp: desc }
    ) {
      id
      number_of_occurrences
      exception_data
    }
  }
`
