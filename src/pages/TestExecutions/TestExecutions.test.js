import React from 'react'
import { shallow } from 'enzyme'

import { TestExecutions } from './TestExecutions'
import { ClassesProxy } from '~utils/tests/mocks'

const initTestExecutions = overrides => {
  const mockProps = {
    match: {
      path: '/test-runs',
      url: '/test-runs',
    },
  }
  const wrapper = shallow(
    <TestExecutions classes={ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: TestExecutions', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initTestExecutions()
      expect(wrapper).toBeTruthy()
    })
  })
})
