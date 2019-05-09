import { useMemo } from 'react'
import { useQuery } from 'react-apollo-hooks'

import { TestSourceType } from '~config/constants'
import { validateOnFieldValue } from '~utils/forms'

import {
  GET_PARAMETERS,
  GET_TEST_SOURCES_FOR_PROJECT,
  GET_CONFIGURATION_TYPES,
} from './graphql'

function useFormSchema({ projectId, mode }) {
  const {
    data: { parameters },
    loading: parametersLoading,
  } = useQuery(GET_PARAMETERS, {
    fetchPolicy: 'cache-and-network',
  })
  const {
    data: { configurationTypes },
    loading: configurationTypesLoading,
  } = useQuery(GET_CONFIGURATION_TYPES, {
    fetchPolicy: 'cache-and-network',
  })
  const {
    data: { testSources },
    loading: testSourcesLoading,
  } = useQuery(GET_TEST_SOURCES_FOR_PROJECT, {
    fetchPolicy: 'cache-and-network',
    variables: { projectId },
  })

  const fields = useMemo(
    () =>
      generateFields({
        parameters: parameters || [],
        configurationTypes: configurationTypes || [],
        testSources: testSources || [],
        testSourceTypes: [
          { slug_name: '', label: 'No test source' },
          { slug_name: TestSourceType.REPOSITORY, label: 'Repository' },
          // { slug_name: TestSourceType.TEST_CREATOR, label: 'Test Creator' }, // Disabled for now
        ],
      }),
    [parameters, configurationTypes, testSources]
  )

  return {
    loading: parametersLoading || configurationTypesLoading || testSourcesLoading,
    fields,
  }
}

function generateFields({
  configurationTypes,
  parameters,
  testSources,
  testSourceTypes,
}) {
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

  const paramTypeValidators = {
    int: { numericality: { onlyInteger: true } },
  }

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
        inclusion: testSourceTypes.map(tst => tst.slug_name),
      },
      options: testSourceTypeOptions,
      inputProps: {
        select: true,
        label: 'Source Type',
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
            },
          },
        }),
        {}
      ),
    },
  }

  return fields
}

function prepareInitialValues(configurationData) {
  if (!configurationData) {
    return {}
  }

  const {
    name,
    type_slug,
    configuration_parameters,
    performed,
    test_source,
  } = configurationData

  return {
    scenario_name: name,
    configuration_type: type_slug,
    performed,
    parameters: configuration_parameters.reduce(
      (acc, parameter) => ({
        ...acc,
        [parameter.parameter_slug]: parameter.value,
      }),
      {}
    ),
    test_source_type: test_source && test_source.source_type,
    test_source: test_source ? { [test_source.source_type]: test_source.id } : null,
  }
}

export { useFormSchema, prepareInitialValues }
