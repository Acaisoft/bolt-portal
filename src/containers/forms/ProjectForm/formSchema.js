import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  name: {
    label: 'Project Name',
    validator: Yup.string()
      .required()
      .ensure()
      .min(3),
  },
  description: {
    label: 'Project Description',
    validator: Yup.string()
      .ensure()
      .max(512),
  },
}

const validationSchema = makeValidationSchema(formFields)
const initialValues = makeEmptyInitialValues(formFields)

export { formFields, validationSchema, initialValues }
