import gql from 'graphql-tag'

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
