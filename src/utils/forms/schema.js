import _ from 'lodash'

import { traverseRecursively } from '../iterators'

const validateFieldsSchema = fieldsSchema => {
  if (typeof fieldsSchema !== 'object' || Object.keys(fieldsSchema).length === 0) {
    throw new Error(
      'Invalid form schema. Provide an object with { [fieldName]: { ... } } structure'
    )
  }
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

  return {
    ...values,
    ...traverseRecursively(fieldsSchema, {
      childKey: 'fields',
      nodeCallback: ({ newSubtree }) => newSubtree,
      leafCallback: ({ path, value = {} }) =>
        _.get(
          values,
          path,
          typeof value.defaultValue !== 'undefined' ? value.defaultValue : ''
        ),
    }),
  }
}
