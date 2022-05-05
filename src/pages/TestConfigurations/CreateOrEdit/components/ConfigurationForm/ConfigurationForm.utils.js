import { useCallback } from 'react'
import { useMutationWithState } from 'hooks'
import { preparePayload } from './formSchema'
import { ADD_CONFIGURATION_MUTATION, EDIT_CONFIGURATION_MUTATION } from './graphql'

export const testsPerformedMessage =
  'You cannot change test source - a test has been performed'

export function useConfigurationSubmit({
  mode,
  configurationId,
  projectId,
  onSubmit,
}) {
  const { mutation: submitMutation } = useMutationWithState(
    mode === 'create' ? ADD_CONFIGURATION_MUTATION : EDIT_CONFIGURATION_MUTATION,
    {
      refetchQueries: [
        'getTestConfigurations',
        mode === 'edit' ? 'getConfiguration' : '',
      ],
    }
  )

  const handleSubmit = useCallback(
    async values => {
      const variables = preparePayload(values, {
        mode,
        configurationId,
        projectId,
      })
      const { errorMessage } = await submitMutation({ variables })
      onSubmit({ values, errorMessage })
    },
    [submitMutation, mode, configurationId, projectId, onSubmit]
  )

  return handleSubmit
}
