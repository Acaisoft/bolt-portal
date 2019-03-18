import gql from 'graphql-tag'
export default gql`
  query getProjectExecutions(
    $projectId: uuid!
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    execution(
      where: { configuration: { project_id: { _eq: $projectId } } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      id
      start
      status
      configuration {
        id
        project_id
        name
        configuration_type {
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
        }
      }
    }
  }
`
