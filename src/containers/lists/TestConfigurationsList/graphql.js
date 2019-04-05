import gql from 'graphql-tag'

export const RUN_TEST_SCENARIO = gql`
  mutation runTestScenario($configurationId: UUID!) {
    testrun_start(conf_id: $configurationId) {
      execution_id
    }
  }
`
