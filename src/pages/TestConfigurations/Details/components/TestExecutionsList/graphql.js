import { gql } from '@apollo/client'

export const TEST_EXECUTION_ITEM_FRAGMENT = gql`
  fragment testExecutionItemInConfigurationDetails on execution {
    id
    start
    start_locust
    status
    argo_name

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

export const GET_TEST_EXECUTIONS_AGGREGATE = gql`
  query getExecutionsAggregate($configurationId: uuid) {
    executionsAggregate: execution_aggregate(
      where: { configuration_id: { _eq: $configurationId } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const SUBSCRIBE_TO_CONFIGURATION_EXECUTIONS = gql`
  subscription subscribeToConfigurationExecutions(
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
      ...testExecutionItemInConfigurationDetails
    }
  }

  ${TEST_EXECUTION_ITEM_FRAGMENT}
`
