import gql from 'graphql-tag'

export const GET_CONFIGURATION = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
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
