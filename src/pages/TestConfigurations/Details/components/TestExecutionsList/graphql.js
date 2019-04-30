import gql from 'graphql-tag'

export const TEST_EXECUTION_ITEM_FRAGMENT = gql`
  fragment testExecutionItem on execution {
    id
    start
    start_locust
    status

    executionTotals: execution_request_totals_aggregate {
      aggregate {
        sum {
          num_failures
          num_requests
        }

        min {
          min_response_time
        }
        avg {
          average_response_time
        }
        max {
          max_response_time
        }
      }
    }
  }
`

export const GET_TEST_EXECUTIONS = gql`
  query getExecutions(
    $configurationId: uuid
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    executions: execution(
      where: { configuration_id: { _eq: $configurationId } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      ...testExecutionItem
    }

    executionsAggregate: execution_aggregate(
      where: { configuration_id: { _eq: $configurationId } }
    ) {
      aggregate {
        count
      }
    }
  }

  ${TEST_EXECUTION_ITEM_FRAGMENT}
`
