import { useState, useCallback } from 'react'
import { useMutation } from 'react-apollo-hooks'
import {
  parseGraphqlResponseError,
  parseGraphqlException,
} from '~utils/errorHandling'

function useMutationWithState(mutationDoc, options) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const rawMutation = useMutation(mutationDoc, options)

  const mutation = useCallback(
    async mutationCallOptions => {
      setLoading(true)
      setError(null)

      let errorMessage = null
      let response
      try {
        response = await rawMutation(mutationCallOptions)
        errorMessage = parseGraphqlResponseError(response)
      } catch (ex) {
        errorMessage = parseGraphqlException(ex)
      }
      setData((response && response.data) || null)
      setError(errorMessage)
      setLoading(false)

      return { errorMessage, response }
    },
    [rawMutation]
  )

  return { loading, mutation, error, data }
}

export default useMutationWithState
