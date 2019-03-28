import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  name: {
    label: 'Name',
    validator: Yup.string()
      .required()
      .ensure()
      .min(3),
    input: {
      variant: 'filled',
    },
  },
  description: {
    label: 'Description',
    validator: Yup.string()
      .ensure()
      .max(512),
    input: {
      variant: 'filled',
    },
  },
}

const validationSchema = makeValidationSchema(formFields)
const initialValues = makeEmptyInitialValues(formFields)

export { formFields, validationSchema, initialValues }
