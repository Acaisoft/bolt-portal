import gql from 'graphql-tag'

export default gql`
  query getRepositories(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [repository_order_by!]
  ) {
    repository(
      where: { project_id: { _eq: $projectId } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      id
      name
      performed
      configuration_type {
        name
      }
      configurations(order_by: { name: asc }) {
        name
      }
    }

    repository_aggregate {
      aggregate {
        count
      }
    }
  }
`
