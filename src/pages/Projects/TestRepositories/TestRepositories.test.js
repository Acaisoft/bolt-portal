import React from 'react'
import { shallow } from 'enzyme'

import { TestRepositories } from './TestRepositories'
import { mocks } from '~utils/tests'

jest.mock('~containers/forms', () => ({ RepositoryForm: 'RepositoryFormMock' }))
jest.mock('~components', () => ({
  AddButton: 'AddButtonMock',
  DataTable: 'DataTableMock',
  DeleteModal: 'DeleteModalMock',
}))

const initComponent = overrides => {
  const mockProps = {
    classes: {},
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = shallow(
    <TestRepositories classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: TestRepositories', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
  })
})
