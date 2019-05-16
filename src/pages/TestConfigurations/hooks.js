import gql from 'graphql-tag'

import { useMutationWithState } from '~hooks'

const RUN_TEST_CONFIGURATION = gql`
  mutation runTestConfiguration($configurationId: UUID!, $coldStart: Boolean) {
    testrun_start(conf_id: $configurationId, no_cache: $coldStart) {
      execution_id
    }
  }
`
export function useConfigurationRun(configurationId) {
  const { loading, mutation, error } = useMutationWithState(RUN_TEST_CONFIGURATION, {
    variables: { configurationId },
  })

  return { loading, mutation, error }
}

const DELETE_TEST_CONFIGURATION = gql`
  mutation deleteTestConfiguration($configurationId: UUID) {
    testrun_configuration_delete(pk: $configurationId) {
      affected_rows
    }
  }
`
export function useConfigurationDelete(configurationId) {
  const { loading, mutation, error } = useMutationWithState(
    DELETE_TEST_CONFIGURATION,
    { variables: { configurationId } }
  )

  return { loading, mutation, error }
}
