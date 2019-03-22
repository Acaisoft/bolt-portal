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
      executions {
        id
        start
      }
      repository {
        id
        url
      }
    }

    configuration_aggregate(where: { project_id: { _eq: $projectId } }) {
      aggregate {
        count
      }
    }
  }
`
