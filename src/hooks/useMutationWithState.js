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
    try {
      const res = await rawMutation(mutationCallOptions)
      if (res.errors) {
        errorMessage = res.errors[0].message
      }
    } catch (ex) {
      errorMessage = ex.message
    }
    setError(errorMessage)
    setLoading(false)

    return errorMessage
  }, [])

  return { loading, mutation, error }
}

export default useMutationWithState
