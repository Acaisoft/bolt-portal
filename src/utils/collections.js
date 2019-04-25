import { setIn } from 'final-form'

export const areArraysEqual = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('Both arguments must be arrays')
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

export const createObjectFromDotNotation = flatValuesMap => {
  return Object.entries(flatValuesMap).reduce(
    (obj, [path, value]) => setIn(obj, path, value),
    {}
  )
}
