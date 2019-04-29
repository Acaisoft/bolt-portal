import {
  makeFlatValidationSchema,
  makeEmptyInitialValues,
  validateOnFieldValue,
} from '~utils/forms'

const paramTypeValidators = {
  int: { numericality: { onlyInteger: true } },
}

const createFormConfig = ({
  configurationTypes,
  parameters,
  isPerformed,
  testSources,
  testSourceTypes,
}) => {
  const configurationTypeOptions = configurationTypes.map(ct => ({
    key: ct.id,
    label: ct.name,
    value: ct.slug_name,
  }))

  const testSourceTypeOptions = testSourceTypes.map(tst => ({
    key: tst.slug_name,
    label: tst.label,
    value: tst.slug_name,
  }))

  const testSourceOptions = testSources.map(ts => ({
    configuration_type: ts[ts.source_type].type_slug,
    key: ts.id,
    label: ts[ts.source_type].name,
    value: ts.id,
    source_type: ts.source_type,
  }))

  const fields = {
    scenario_name: {
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
    test_source_type: {
      validator: {
        presence: { allowEmpty: false },
        inclusion: testSourceTypes.map(tst => tst.slug_name),
      },
      options: testSourceTypeOptions,
      inputProps: {
        select: true,
        label: 'Source Type',
        disabled: isPerformed,
      },
    },
    test_source: {
      fields: testSourceTypes.reduce(
        (acc, type) => ({
          ...acc,
          // type.slug_name: repository, test_creator
          [type.slug_name]: {
            validator: validateOnFieldValue('test_source_type', type.slug_name, {
              presence: { allowEmpty: false },
              inclusion: testSources.map(ts => ts.id),
            }),
            options: testSourceOptions.filter(
              tso => tso.source_type === type.slug_name
            ),
            inputProps: {
              select: true,
              label: `Select ${type.label}`,
              disabled: isPerformed,
            },
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
