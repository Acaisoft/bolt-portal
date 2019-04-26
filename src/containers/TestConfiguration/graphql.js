import gql from 'graphql-tag'

export const GET_CONFIG_QUERY = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration_by_pk(id: $configurationId) {
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
  }
`

export const RUN_TEST_SCENARIO = gql`
  mutation runTestScenario($configurationId: UUID!) {
    testrun_start(conf_id: $configurationId) {
      execution_id
    }
  }
`

export const DELETE_TEST_SCENARIO = gql`
  mutation deleteTestScenario($configurationId: UUID) {
    testrun_configuration_delete(pk: $configurationId) {
      affected_rows
    }
  }
`
