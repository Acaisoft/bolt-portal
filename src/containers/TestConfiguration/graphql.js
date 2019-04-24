import gql from 'graphql-tag'

export const GET_CONFIG_QUERY = gql`
  query getTestConfiguration($configurationId: uuid) {
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
export default GET_CONFIG_QUERY
