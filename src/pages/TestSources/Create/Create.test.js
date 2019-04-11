import React from 'react'
import { shallow } from 'enzyme'

import { Create } from './Create'
import { mocks } from '~utils/tests'

const initCreate = overrides => {
  const mockProps = {
    match: {
      path: '/test-sources/create',
      url: '/test-sources/create',
      params: {
        projectId: 'mockedProjectId',
        testSourceId: 'mockedTestSourceId',
      },
    },
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = shallow(
    <Create classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: Create', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initCreate()
      expect(wrapper).toBeTruthy()
    })
    it('should as expected', () => {
      const { wrapper } = initCreate()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
