import * as Yup from 'yup'

import { makeValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const createFormConfig = ({ configurationTypes, parameters }) => {
  const configurationTypeOptions = configurationTypes.map(ct => ({
    key: ct.id,
    label: ct.name,
    value: ct.slug_name,
  }))

  const fields = {
    name: {
      label: 'Name',
      validator: Yup.string()
        .required()
        .ensure()
        .min(2),
    },
    configuration_type: {
      label: 'Test Type',
      validator: Yup.string()
        .oneOf(configurationTypeOptions.map(cto => cto.value))
        .required(),
      options: configurationTypeOptions,
    },
    parameters: {
      fields: parameters.reduce(
        (acc, parameter) => ({
          ...acc,
          [parameter.slug_name]: {
            label: parameter.name,
            validator:
              parameter.param_type === 'str'
                ? Yup.string()
                    .ensure()
                    .required()
                : Yup.number()
                    .positive()
                    .integer()
                    .required(),
            defaultValue: parameter.default_value,
          },
        }),
        {}
      ),
    },
  }

  const validationSchema = makeValidationSchema(fields)
  const mergeInitialValues = values => makeEmptyInitialValues(fields, values)

  return { fields, validationSchema, mergeInitialValues }
}

export { createFormConfig }
