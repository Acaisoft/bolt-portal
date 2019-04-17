import gql from 'graphql-tag'

export default gql`
  mutation deleteConfig($configurationId: UUID) {
    testrun_configuration_delete(pk: $configurationId) {
      affected_rows
    }
  }
`
