import { gql } from '@apollo/client'

export const GET_ENDPOINT_FAILURES = gql`
  query getEndpointFailures($endpointId: String!) {
    endpointFailures: execution_errors(
      where: { identifier: { _eq: $endpointId } }
      distinct_on: exception_data
      order_by: { exception_data: asc, timestamp: desc }
    ) {
      id
      number_of_occurrences
      exception_data
    }
  }
`
