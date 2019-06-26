import { useState, useCallback } from 'react'

function useCallbackRef() {
  const [el, setEl] = useState(null)

  const ref = useCallback(node => {
    if (node !== null) {
      setEl(node)
    }
  }, [])

  return [el, ref]
}

export default useCallbackRef
