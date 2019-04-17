import gql from 'graphql-tag'

export const GET_TEST_EXECUTIONS = gql`
  query getExecutions(
    $projectId: uuid
    $configurationId: uuid
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    executions: execution(
      where: {
        configuration: { project_id: { _eq: $projectId } }
        configuration_id: { _eq: $configurationId }
      }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
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
    pagination: execution_aggregate(
      where: {
        configuration: { project_id: { _eq: $projectId } }
        configuration_id: { _eq: $configurationId }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
