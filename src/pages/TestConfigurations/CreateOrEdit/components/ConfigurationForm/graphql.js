import gql from 'graphql-tag'

export const GET_CONFIGURATION = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
      id
      name
      performed
      configuration_parameters {
        parameter_slug
        value
      }
      type_slug
      test_source {
        id
        source_type
      }
      has_pre_test
      has_post_test
      has_load_tests
      has_monitoring
      configuration_envvars {
        name
        value
      }
    }
  }
`

export const ADD_CONFIGURATION_MUTATION = gql`
  mutation addTestConfiguration(
    $name: String!
    $type_slug: String!
    $configuration_parameters: [ConfigurationParameterInput]
    $test_source_id: UUID
    $project_id: UUID!
    $has_pre_test: Boolean
    $has_post_test: Boolean
    $has_load_tests: Boolean
    $has_monitoring: Boolean
  ) {
    testrun_configuration_create(
      configuration_parameters: $configuration_parameters
      name: $name
      project_id: $project_id
      type_slug: $type_slug
      test_source_id: $test_source_id
      has_pre_test: $has_pre_test
      has_post_test: $has_post_test
      has_load_tests: $has_load_tests
      has_monitoring: $has_monitoring
    ) {
      returning {
        id
      }
    }
  }
`
export const EDIT_CONFIGURATION_MUTATION = gql`
  mutation editTestConfiguration(
    $id: UUID!
    $name: String!
    $type_slug: String!
    $configuration_parameters: [ConfigurationParameterInput]
    $test_source_id: UUID
    $has_pre_test: Boolean
    $has_post_test: Boolean
    $has_load_tests: Boolean
    $has_monitoring: Boolean
  ) {
    testrun_configuration_update(
      id: $id
      configuration_parameters: $configuration_parameters
      name: $name
      type_slug: $type_slug
      test_source_id: $test_source_id
      has_pre_test: $has_pre_test
      has_post_test: $has_post_test
      has_load_tests: $has_load_tests
      has_monitoring: $has_monitoring
    ) {
      returning {
        id
      }
    }
  }
`

export const EDIT_PERFORMED_CONFIGURATION_MUTATION = gql`
  mutation editPerformedTestConfiguration($id: UUID!, $name: String!) {
    testrun_configuration_update(id: $id, name: $name) {
      returning {
        id
      }
    }
  }
`

export const GET_TEST_SOURCES_FOR_PROJECT = gql`
  query getTestSourcesForProject($projectId: uuid) {
    testSources: test_source(where: { project_id: { _eq: $projectId } }) {
      id
      source_type
      repository {
        id
        name
        type_slug
      }
      test_creator {
        id
        name
        type_slug
      }
    }
  }
`

export const GET_CONFIGURATION_TYPES = gql`
  query getConfigurationTypesForSelector {
    configurationTypes: configuration_type {
      id
      name
      slug_name
    }
  }
`

export const GET_PARAMETERS = gql`
  query getParameters {
    parameters: parameter {
      id
      name
      param_name
      param_type
      default_value
      slug_name
      type_slug
    }
  }
`
