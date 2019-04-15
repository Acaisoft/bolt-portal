import gql from 'graphql-tag'

export default gql`
  query getTestConfigurations(
    $projectId: uuid
    $configurationId: uuid
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    configuration(
      where: { project_id: { _eq: $projectId }, id: { _eq: $configurationId } }
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
      configuration_parameters {
        id
        value
        parameter_slug
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
          url
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
