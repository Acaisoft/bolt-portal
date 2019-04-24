import gql from 'graphql-tag'

export const GET_CONFIGURATION_QUERY = gql`
  query getConfiguration($configurationId: uuid!) {
    configuration_by_pk(id: $configurationId) {
      id
      name
      performed
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
  ) {
    testrun_configuration_create(
      configuration_parameters: $configuration_parameters
      name: $name
      project_id: $project_id
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
  ) {
    testrun_configuration_update(
      id: $id
      configuration_parameters: $configuration_parameters
      name: $name
      type_slug: $type_slug
    ) {
      returning {
        id
      }
    }
  }
`
