import { useMemo } from 'react'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION } from './graphql'

export function useResultsPerEndpointQuery(executionId) {
  const {
    data: { resultsPerEndpoint } = {},
    loading,
    error,
  } = useSubscription(SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION, {
    variables: { executionId },
    fetchPolicy: 'cache-and-network',
  })

  const preparedData = useMemo(
    () =>
      (resultsPerEndpoint || []).map(result => ({
        ...result,
        num_successes: +result['num_requests'] - +result['num_failures'],
      })),
    [resultsPerEndpoint]
  )

  return {
    resultsPerEndpoint: preparedData,
    loading,
    error,
  }
}
