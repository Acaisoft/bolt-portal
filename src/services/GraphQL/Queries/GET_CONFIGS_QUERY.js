import gql from 'graphql-tag'

export default gql`
  query getTestConfigurations(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    configuration(
      where: { project_id: { _eq: $projectId } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      id
      name
      configuration_type {
        id
        name
      }
      executions {
        id
        start
      }
      test_source {
        id
        source_type
        repository {
          id
          name
        }
        test_creator {
          id
          name
        }
      }
    }
    configuration_aggregate(where: { project_id: { _eq: $projectId } }) {
      aggregate {
        count
      }
    }
  }
`
