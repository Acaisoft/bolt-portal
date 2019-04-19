import React from 'react'
import { shallow } from 'enzyme'

import { ConfigurationForm } from './ConfigurationForm'

const initConfigurationForm = overrides => {
  const mockProps = {
    configurationId: 'testConfigurationId',
    projectId: 'testProjectId',
  }
  const mockMethods = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  }
  const wrapper = shallow(<ConfigurationForm {...mockProps} {...overrides} />)
  return { mockProps, wrapper }
}

describe('global: ConfigurationForm', () => {
  it('renders without crashing', () => {
    const { wrapper } = initConfigurationForm()
    expect(wrapper).toBeTruthy()
  })

  it('should render as expected', () => {
    const { wrapper } = initConfigurationForm({})
    expect(wrapper).toMatchSnapshot()
  })
})
