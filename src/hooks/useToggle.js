import { useState, useCallback } from 'react'

// toggle() -> toggle state
// toggle(true) -> set to true
// toggle(false) -> set to false
function useToggle(initialState = false) {
  const [on, setOn] = useState(initialState)

  const toggle = useCallback(flag => {
    if (typeof flag === 'undefined') {
      setOn(s => !s)
    } else {
      setOn(flag)
    }
  }, [])

  return [on, toggle]
}

export default useToggle
