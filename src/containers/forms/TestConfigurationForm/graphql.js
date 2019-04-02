import gql from 'graphql-tag'

export const GET_CONFIGURATION_QUERY = gql`
  query getConfiguration($configurationId: uuid!) {
    configuration_by_pk(id: $configurationId) {
      id
      name
      configuration_parameters {
        parameter_slug
        value
      }
      type_slug
    }
  }
`

export const ADD_CONFIGURATION_MUTATION = gql`
  mutation addConfiguration(
    $name: String!
    $type_slug: String!
    $configuration_parameters: [ConfigurationParameterInput]!
    $project_id: UUID!
    $test_source_id: String
  ) {
    testrun_configuration_create(
      configuration_parameters: $configuration_parameters
      name: $name
      project_id: $project_id
      test_source_id: $test_source_id
      type_slug: $type_slug
    ) {
      returning {
        id
      }
    }
  }
`
export const EDIT_CONFIGURATION_MUTATION = gql`
  mutation editConfiguration(
    $id: UUID!
    $name: String!
    $type_slug: String!
    $configuration_parameters: [ConfigurationParameterInput]!
    $test_source_id: String
  ) {
    testrun_configuration_create(
      id: $id
      configuration_parameters: $configuration_parameters
      name: $name
      test_source_id: $test_source_id
      type_slug: $type_slug
    ) {
      returning {
        id
      }
    }
  }
`
