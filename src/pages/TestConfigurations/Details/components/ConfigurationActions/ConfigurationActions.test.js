import React from 'react'
import { shallow } from 'enzyme'
import { mocks } from '~utils/tests'

import { ConfigurationActions } from './ConfigurationActions'

const initConfigurationActions = overrides => {
  const mockProps = {
    classes: mocks.ClassesProxy,
  }
  const mockMethods = {
    onEdit: jest.fn(),
    onChange: jest.fn(),
    onPlay: jest.fn(),
  }
  const wrapper = shallow(
    <ConfigurationActions {...mockProps} {...mockMethods} {...overrides} />
  )
  return { mockProps, wrapper }
}

describe('global: ConfigurationActions', () => {
  it('renders without crashing', () => {
    const { wrapper } = initConfigurationActions()
    expect(wrapper).toBeTruthy()
  })

  it('should render as expected', () => {
    const { wrapper } = initConfigurationActions({})
    expect(wrapper).toMatchSnapshot()
  })
})
