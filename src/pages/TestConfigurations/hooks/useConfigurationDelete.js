import gql from 'graphql-tag'

import { useMutationWithState } from '~hooks'

export const DELETE_TEST_CONFIGURATION = gql`
  mutation deleteTestConfiguration($configurationId: UUID) {
    testrun_configuration_delete(pk: $configurationId) {
      affected_rows
    }
  }
`

function useConfigurationDelete(configurationId) {
  const { loading, mutation, error } = useMutationWithState(
    DELETE_TEST_CONFIGURATION,
    {
      variables: { configurationId },
    }
  )

  return { loading, mutation, error }
}

export default useConfigurationDelete
