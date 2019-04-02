import validate from 'validate.js'

import { createObjectFromDotNotation } from '../collections'

export const validateForm = schema => values => {
  const result = validate(values, schema)
  if (!result) {
    return
  }

  // Get first error message for each field.
  Object.keys(result).forEach(key => {
    result[key] = result[key][0]
  })

  // Convert { path.to.field: value } into { path: { to: { field: value } } }
  return createObjectFromDotNotation(result)
}
