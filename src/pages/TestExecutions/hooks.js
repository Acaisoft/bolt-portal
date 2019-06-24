import { useCallback, useEffect } from 'react'
import gql from 'graphql-tag'
import _ from 'lodash'

import { useMutationWithState } from '~hooks'

export const TERMINATE_EXECUTION = gql`
  mutation terminateExecution($argoName: String!) {
    testrun_terminate(argo_name: $argoName) {
      ok
      message
    }
  }
`

export function useExecutionTerminate({ onTerminate }) {
  const { error, data, mutation: terminate } = useMutationWithState(
    TERMINATE_EXECUTION
  )

  const handleExecutionTerminate = useCallback(
    execution =>
      execution && terminate({ variables: { argoName: execution.argo_name } }),
    [terminate]
  )

  useEffect(() => {
    if (error || data) {
      onTerminate({
        error: error ? error : _.get(data, 'testrun_terminate.message'),
        ok: _.get(data, 'testrun_terminate.ok', false),
      })
    }
  }, [error, data, onTerminate])

  return handleExecutionTerminate
}
