import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  name: {
    label: 'Project Name',
    validator: Yup.string()
      .required()
      .ensure()
      .min(2),
  },
  description: {
    label: 'Project Descripiton',
    validator: Yup.string().ensure(),
  },
  image: {
    label: 'Project Image',
    validator: Yup.string().ensure(),
  },
}

const validationSchema = makeValidationSchema(formFields)
const initialValues = makeEmptyInitialValues(formFields)

export { formFields, validationSchema, initialValues }
