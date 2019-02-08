import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const formFields = {
  name: {
    label: 'Project Name',
    validator: Yup.string()
      .ensure()
      .min(2),
  },
  description: {
    label: 'Project Descripiton',
    validator: Yup.string()
      .ensure()
      .min(2),
  },
  image: {
    label: 'Project Image',
    validator: Yup.string().required('Image URL is required'),
  },
}

const validationSchema = makeValidationSchema(formFields)
const initialValues = makeEmptyInitialValues(formFields)

export { formFields, validationSchema, initialValues }
