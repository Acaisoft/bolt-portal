import { makeFlatValidationSchema, makeEmptyInitialValues } from '~utils/forms'

const paramTypeValidators = {
  int: { numericality: { onlyInteger: true } },
}

const createFormConfig = ({ configurationTypes, parameters, isPerformed }) => {
  const configurationTypeOptions = configurationTypes.map(ct => ({
    key: ct.id,
    label: ct.name,
    value: ct.slug_name,
  }))

  const fields = {
    name: {
      validator: {
        presence: { allowEmpty: false },
      },
      inputProps: {
        label: 'Name',
      },
    },
    configuration_type: {
      validator: {
        inclusion: configurationTypeOptions.map(cto => cto.value),
      },
      options: configurationTypeOptions,
      inputProps: {
        select: true,
        label: 'Test Type',
        disabled: isPerformed,
      },
    },
    parameters: {
      fields: parameters.reduce(
        (acc, parameter) => ({
          ...acc,
          [parameter.slug_name]: {
            validator: (value, attributes, attributeName) => {
              if (attributes.configuration_type === parameter.type_slug) {
                return {
                  presence: { allowEmpty: true },
                  ...paramTypeValidators[parameter.param_type],
                }
              }
            },
            inputProps: {
              label: parameter.name,
              disabled: isPerformed,
            },
            defaultValue: parameter.default_value,
            group: parameter.type_slug,
          },
        }),
        {}
      ),
    },
  }

  const validationSchema = makeFlatValidationSchema(fields)
  const mergeInitialValues = values => makeEmptyInitialValues(fields, values)

  return { fields, validationSchema, mergeInitialValues }
}

export { createFormConfig }
