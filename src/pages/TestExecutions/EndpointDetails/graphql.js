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
      min_response_time
      average_response_time
      max_response_time
      average_content_size
    }
  }
`
