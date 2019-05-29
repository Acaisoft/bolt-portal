import gql from 'graphql-tag'

export const GET_ENDPOINT_TOTALS = gql`
  query getEndpointTotals($endpointId: String!) {
    endpointTotals: execution_request_totals(
      where: { identifier: { _eq: $endpointId } }
    ) {
      identifier
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
