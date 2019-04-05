import validate from 'validate.js'
import { getIn } from 'final-form'

import { createObjectFromDotNotation } from '../collections'

// Usually used as: <Form validate={values => validateForm(values, mySchema)} />
export const validateForm = (values, schema) => {
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

// Base, general conditional validator for creating other.
// It applies the validation constraints only if the predicate returns true
export const validateWhen = (predicate, validation) => (
  value,
  attributes,
  attributeName
) => {
  if (!predicate(value, attributes, attributeName)) {
    return null
  }

  return validation
}

// e.g. validateOnFieldValue('some.field', 'expected value', { ... })
export const validateOnFieldValue = (fieldPath, value, validation) => {
  return validateWhen((_, attributes) => {
    return getIn(attributes, fieldPath) === value
  }, validation)
}
