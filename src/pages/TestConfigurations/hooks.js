import { gql } from '@apollo/client'

import { useMutationWithState } from 'hooks'

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

const CLONE_SCENARIO = gql`
  mutation clone_scenario($configurationId: UUID!) {
    testrun_configuration_clone(configuration_id: $configurationId) {
      returning {
        new_configuration_id
      }
      affected_rows
    }
  }
`

export function useConfigurationClone(configurationId) {
  const { loading, mutation, error } = useMutationWithState(CLONE_SCENARIO, {
    variables: { configurationId },
  })

  return { loading, mutation, error }
}
