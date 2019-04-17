import gql from 'graphql-tag'

export const RUN_TEST_SCENARIO = gql`
  mutation runTestScenario($configurationId: UUID!) {
    testrun_start(conf_id: $configurationId) {
      execution_id
    }
  }
`

export const GET_TEST_CONFIGURATIONS = gql`
  query getTestConfigurations(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    configurations: configuration(
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
    pagination: configuration_aggregate(where: { project_id: { _eq: $projectId } }) {
      aggregate {
        count
      }
    }
  }
`
