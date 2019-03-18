import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  name: {
    label: 'Repository Name',
    validator: Yup.string()
      .required()
      .ensure()
      .min(2),
  },
  url: {
    label: 'Repository URL',
    validator: Yup.string()
      .required()
      .ensure()
      .min(2),
  },
}

const validationSchema = makeValidationSchema(formFields)
const initialValues = makeEmptyInitialValues(formFields)

export { formFields, validationSchema, initialValues }
