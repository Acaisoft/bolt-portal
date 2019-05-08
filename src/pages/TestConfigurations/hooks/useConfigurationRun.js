import gql from 'graphql-tag'

import { useMutationWithState } from '~hooks'

export const RUN_TEST_CONFIGURATION = gql`
  mutation runTestConfiguration($configurationId: UUID!, $coldStart: Boolean) {
    testrun_start(conf_id: $configurationId, no_cache: $coldStart) {
      execution_id
    }
  }
`

function useConfigurationRun(configurationId) {
  const { loading, mutation, error } = useMutationWithState(RUN_TEST_CONFIGURATION, {
    variables: { configurationId },
  })

  return { loading, mutation, error }
}

export default useConfigurationRun
