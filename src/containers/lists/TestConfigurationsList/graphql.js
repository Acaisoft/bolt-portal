import gql from 'graphql-tag'

export const RUN_TEST_SCENARIO = gql`
  mutation runTestScenario($configurationId: UUID!) {
    testrun_start(conf_id: $configurationId) {
      execution_id
    }
  }
`

const TEST_CONFIGURATION_LIST_ITEM = gql`
  fragment testConfigurationListItem on configuration {
    id
    name
    performed
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
`

export const GET_TEST_CONFIGURATIONS = gql`
  query getTestConfigurations(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [configuration_order_by!]
  ) {
    configurations: configuration(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      ...testConfigurationListItem
    }
    configuration_aggregate(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }

  ${TEST_CONFIGURATION_LIST_ITEM}
`
