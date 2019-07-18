import { useMemo } from 'react'
import { useQuery } from 'react-apollo-hooks'

import { TestSourceType } from '~config/constants'
import { validateOnFieldValue } from '~utils/forms'

import {
  GET_PARAMETERS,
  GET_TEST_SOURCES_FOR_PROJECT,
  GET_CONFIGURATION_TYPES,
} from './graphql'

const scenarioParts = [
  {
    id: 'has_pre_test',
    label: 'Before Scenario',
    description: 'before description',
  },
  {
    id: 'has_post_test',
    label: 'After Scenario',
    description: 'after description',
  },
  {
    id: 'has_load_tests',
    label: 'Load Tests',
    description: 'load tests description',
  },
  {
    id: 'has_monitoring',
    label: 'Monitoring',
    description: 'monitoring description',
  },
]

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
    str: { length: { minimum: 1 } },
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
    scenario_parts: {
      fields: scenarioParts.reduce(
        (acc, sp) => ({
          ...acc,
          [sp.id]: {
            inputProps: {
              label: sp.label,
              helperText: sp.description,
            },
            defaultValue: false,
          },
        }),
        {}
      ),
    },
    parameters: {
      fields: parameters.reduce(
        (acc, parameter) => ({
          ...acc,
          [parameter.slug_name]: {
            validator: (value, formValues) => {
              if (
                formValues.configuration_type === parameter.type_slug &&
                ((formValues.scenario_parts.has_load_tests &&
                  parameter.slug_name.includes('load_tests')) ||
                  (formValues.scenario_parts.has_monitoring &&
                    parameter.slug_name.includes('monitoring')))
              ) {
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
            // TODO: Probably will need to be rewritten
            // when we decide how to store monitoring parameters
            scenarioPart: parameter.slug_name.includes('monitoring')
              ? 'monitoring'
              : 'load_tests',
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

function prepareInitialValues(data) {
  if (!data) {
    return {
      configuration_type: 'load_tests',
      configuration_envvars: [{ name: '', value: '' }],
    }
  }

  const {
    name,
    type_slug,
    configuration_parameters,
    performed,
    test_source,
    has_pre_test,
    has_post_test,
    has_load_tests,
    has_monitoring,
    configuration_envvars,
  } = data

  return {
    scenario_name: name,
    configuration_type: type_slug,
    performed,
    scenario_parts: {
      has_pre_test,
      has_post_test,
      has_load_tests,
      has_monitoring,
    },
    parameters: configuration_parameters.reduce(
      (acc, parameter) => ({
        ...acc,
        [parameter.parameter_slug]: parameter.value,
      }),
      {}
    ),
    test_source_type: test_source && test_source.source_type,
    test_source: test_source ? { [test_source.source_type]: test_source.id } : null,
    configuration_envvars: configuration_envvars.map(({ name, value }) => ({
      name,
      value,
    })) || [{ name: '', value: '' }],
  }
}

function preparePayload(formValues, { mode, configurationId, projectId }) {
  if (!formValues) {
    return {}
  }

  const {
    scenario_name,
    configuration_type,
    scenario_parts: { has_pre_test, has_post_test, has_load_tests, has_monitoring },
    parameters,
    test_source_type,
    test_source,
    configuration_envvars,
  } = formValues

  const variables = {
    name: scenario_name,
    configuration_envvars: configuration_envvars.filter(
      ce => ce.name !== '' && typeof ce.name !== 'undefined'
    ),
  }

  if (mode === 'create') {
    variables.project_id = projectId
  } else {
    variables.id = configurationId
  }

  Object.assign(variables, {
    type_slug: configuration_type,
    has_pre_test,
    has_post_test,
    has_load_tests,
    has_monitoring,
    configuration_parameters: Object.entries(parameters)
      .map(([slug, value]) => ({
        parameter_slug: slug,
        value,
      }))
      // Skip parameters for not checked scenario parts
      .filter(
        ({ parameter_slug }) =>
          (has_load_tests && parameter_slug.includes('load_tests')) ||
          (has_monitoring && parameter_slug.includes('monitoring'))
      ),
    test_source_id: test_source[test_source_type],
  })

  return variables
}

export { useFormSchema, prepareInitialValues, preparePayload }
