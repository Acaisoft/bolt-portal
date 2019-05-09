import { useState, useCallback } from 'react'
import { useMutation } from 'react-apollo-hooks'

function useMutationWithState(mutationDoc, options) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const rawMutation = useMutation(mutationDoc, options)

  const mutation = useCallback(async mutationCallOptions => {
    setLoading(true)
    setError(null)

    let errorMessage = null
    let response
    try {
      response = await rawMutation(mutationCallOptions)
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        errorMessage = response.errors[0].message
      }
    } catch (ex) {
      errorMessage =
        Array.isArray(ex.graphQLErrors) && ex.graphQLErrors.length > 0
          ? ex.graphQLErrors[0].message
          : ex.message
    }
    setError(errorMessage)
    setLoading(false)

    return { errorMessage, response }
  }, [])

  return { loading, mutation, error }
}

export default useMutationWithState
