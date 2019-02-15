import React from 'react'
import { shallow } from 'enzyme'

import { TestConfigurations } from './TestConfigurations'
import { mocks } from '~utils/tests'

jest.mock('~components/DataTable', () => 'DataTableMock')

const initComponent = overrides => {
  const mockProps = {
    classes: {},
  }
  const wrapper = shallow(
    <TestConfigurations classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: TestConfigurations', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
    it('should render as expected', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
