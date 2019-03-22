import React from 'react'
import { shallow } from 'enzyme'

import { List } from './List'
import { mocks } from '~utils/tests'

jest.mock('~components', () => ({
  DataTable: 'DataTableMock',
  DeleteModal: 'DeleteModalMock',
}))

const initComponent = overrides => {
  const mockProps = {
    match: {
      url: '/test-configurations',
      params: {
        projectId: 'p123',
      },
    },
  }
  const wrapper = shallow(
    <List classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: List', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
  })
})
