import React from 'react'
import { shallow } from 'enzyme'
import { mocks } from '~utils/tests'

import { ConfigurationInfo } from './ConfigurationInfo'

const initConfigurationInfo = overrides => {
  const mockProps = {
    classes: mocks.ClassesProxy,
    configuration: {
      name: 'Mocked configuration name',
      configuration_parameters: [
        { parameter_slug: 'mockedParam1', value: 'mockedValued1' },
        { parameter_slug: 'mockedParam2', value: 'mockedValued2' },
      ],
      configuration_type: {
        name: 'mockedConfigurationTypeName',
      },
      test_source: {
        source_type: 'repository',
        repository: {
          name: 'mockedRepositoryName',
          url: 'mockedRepostiroyUrl',
        },
      },
    },
  }
  const wrapper = shallow(<ConfigurationInfo {...mockProps} {...overrides} />)
  return { mockProps, wrapper }
}

describe('global: ConfigurationInfo', () => {
  it('renders without crashing', () => {
    const { wrapper } = initConfigurationInfo()
    expect(wrapper).toBeTruthy()
  })

  it('should render as expected', () => {
    const { wrapper } = initConfigurationInfo({})
    expect(wrapper).toMatchSnapshot()
  })
})
