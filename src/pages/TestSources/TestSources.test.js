import React from 'react'
import { shallow } from 'enzyme'

import { TestSources } from './TestSources'
import { mocks } from '~utils/tests'

const initTestSources = overrides => {
  const mockProps = {
    match: {
      path: '/test-sources',
      url: '/test-sources',
      params: {},
    },
  }
  const wrapper = shallow(
    <TestSources classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: TestSources', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initTestSources()
      expect(wrapper).toBeTruthy()
    })
  })
})
