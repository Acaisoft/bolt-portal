import { getIn } from 'formik'
import * as Yup from 'yup'
import validate from 'validate.js'

import { traverseRecursively } from './iterators'
import { createObjectFromDotNotation } from './collections'

const validateFieldsSchema = fieldsSchema => {
  if (typeof fieldsSchema !== 'object' || Object.keys(fieldsSchema).length === 0) {
    throw new Error(
      'Invalid form schema. Provide an object with { [fieldName]: { ... } } structure'
    )
  }
}

const defaultNodeValidator = fieldValidators => Yup.object().shape(fieldValidators)

export const makeValidationSchema = (
  fieldsSchema,
  nodeValidator = defaultNodeValidator
) => {
  validateFieldsSchema(fieldsSchema)

  const fieldValidators = traverseRecursively(fieldsSchema, {
    childKey: 'fields',
    nodeCallback: ({ newSubtree }) => nodeValidator(newSubtree),
    leafCallback: ({ value }) =>
      value.label ? value.validator.label(value.label) : value.validator,
  })

  return nodeValidator(fieldValidators)
}

export const makeFlatValidationSchema = fieldsSchema => {
  validateFieldsSchema(fieldsSchema)

  const schema = {}
  traverseRecursively(fieldsSchema, {
    childKey: 'fields',
    nodeCallback: () => {},
    leafCallback: ({ value, path }) => {
      schema[path.join('.')] = value.validator
    },
  })

  return schema
}

export const makeEmptyInitialValues = (fieldsSchema, values = {}) => {
  validateFieldsSchema(fieldsSchema)

  return traverseRecursively(fieldsSchema, {
    childKey: 'fields',
    nodeCallback: ({ newSubtree }) => newSubtree,
    leafCallback: ({ path, value = {} }) =>
      getIn(values, path, value.defaultValue || ''),
  })
}

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
