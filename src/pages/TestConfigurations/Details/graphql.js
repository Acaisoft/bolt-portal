import { gql } from '@apollo/client'

export const GET_CONFIGURATION = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
      id
      name
      performed
      has_monitoring
      has_post_test
      has_pre_test
      has_load_tests
      configuration_envvars {
        name
        value
      }
      configuration_type {
        id
        name
      }
      configuration_parameters {
        id
        value
        parameter_slug
        parameter {
          name
        }
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
