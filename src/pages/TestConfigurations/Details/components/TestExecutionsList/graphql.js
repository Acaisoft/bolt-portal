import gql from 'graphql-tag'

export const TEST_EXECUTION_ITEM_FRAGMENT = gql`
  fragment testExecutionItem on execution {
    id
    start
    status
    configuration {
      id
      name
      configuration_type {
        id
        name
      }
      project {
        id
        name
      }
    }
    result_aggregate_aggregate {
      aggregate {
        count
        sum {
          number_of_successes
          number_of_fails
        }
        max {
          number_of_users
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
  }

  ${TEST_EXECUTION_ITEM_FRAGMENT}
`
