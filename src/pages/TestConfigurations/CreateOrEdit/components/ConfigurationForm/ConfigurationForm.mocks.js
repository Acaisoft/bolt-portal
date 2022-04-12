import { mockGraphqlData } from 'utils/tests/mocks'
import {
  GET_CONFIGURATION_TYPES,
  GET_PARAMETERS,
  GET_TEST_SOURCES_FOR_PROJECT,
} from './graphql'

const mockedConfigurationTypesData = {
  configurationTypes: [
    {
      __typename: 'configuration_type',
      id: 'fc9c1146-44d7-4054-a12c-4c0f70487230',
      name: 'Performance',
      slug_name: 'load_tests',
    },
  ],
}

const mockedTestSourcesData = {
  testSources: [
    {
      __typename: 'test_source',
      id: '80643454-5ef7-44e3-908e-c3570cd011dc',
      source_type: 'repository',
      repository: {
        __typename: 'repository',
        id: '80643454-5ef7-44e3-908e-c3570cd011dc',
        name: 'LoadTestsRepo',
        type_slug: 'load_tests',
      },
      test_creator: null,
    },
  ],
}

const testParametersMockData = {
  parameters: [
    {
      __typename: 'parameter',
      id: '9352e6d1-229a-4938-9e9f-9ea8ab0600e0',
      name: 'time',
      param_name: '-t',
      param_type: 'str',
      default_value: '10',
      slug_name: 'load_tests_duration',
      type_slug: 'load_tests',
    },
    {
      __typename: 'parameter',
      id: '35f63de7-b372-4eb2-8f67-a471a6c67b50',
      name: 'users/second',
      param_name: '-r',
      param_type: 'int',
      default_value: '500',
      slug_name: 'load_tests_rampup',
      type_slug: 'load_tests',
    },
    {
      __typename: 'parameter',
      id: '7dfe8616-365a-4aec-895f-f8a7eb8f30c6',
      name: 'users',
      param_name: '-c',
      param_type: 'int',
      default_value: '1000',
      slug_name: 'load_tests_users',
      type_slug: 'load_tests',
    },
    {
      __typename: 'parameter',
      id: '7a8423d3-88ce-4277-ac8d-131a6fb32314',
      name: 'host',
      param_name: '-H',
      param_type: 'str',
      default_value: '',
      slug_name: 'load_tests_host',
      type_slug: 'load_tests',
    },
    {
      __typename: 'parameter',
      id: '97285024-0d4d-439d-abee-705c04cafec8',
      name: 'monitoring duration',
      param_name: '-md',
      param_type: 'int',
      default_value: '10',
      slug_name: 'monitoring_duration',
      type_slug: 'load_tests',
    },
    {
      __typename: 'parameter',
      id: '8a8ef988-62b6-4338-a350-9712e00b024b',
      name: 'monitoring interval',
      param_name: '-mi',
      param_type: 'int',
      default_value: '5',
      slug_name: 'monitoring_interval',
      type_slug: 'load_tests',
    },
  ],
}

export const configurationTypesMock = mockGraphqlData(
  GET_CONFIGURATION_TYPES,
  mockedConfigurationTypesData
)

export const testSourcesMock = mockGraphqlData(
  GET_TEST_SOURCES_FOR_PROJECT,
  mockedTestSourcesData
)

export const testParametersMock = mockGraphqlData(
  GET_PARAMETERS,
  testParametersMockData
)
