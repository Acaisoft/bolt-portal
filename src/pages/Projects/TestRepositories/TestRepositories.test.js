import React from 'react'
import { shallow } from 'enzyme'

import { TestRepositories } from './TestRepositories'
import { mocks } from '~utils/tests'

const initTestRepositories = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <TestRepositories classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: TestRepositories', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initTestRepositories()
      expect(wrapper).toBeTruthy()
    })
  })
})
