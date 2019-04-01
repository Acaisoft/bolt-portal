import gql from 'graphql-tag'

export default gql`
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
