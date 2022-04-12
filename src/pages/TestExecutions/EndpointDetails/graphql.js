import { gql } from '@apollo/client'

export const GET_ENDPOINT = gql`
  query getEndpoint($endpointId: String!) {
    endpoint: execution_requests(
      where: { identifier: { _eq: $endpointId } }
      order_by: { timestamp: desc }
      limit: 1
    ) {
      id
      identifier
      timestamp
      method
      name
    }
  }
`
