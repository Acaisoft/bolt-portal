import React from 'react'
import { shallow } from 'enzyme'

import { TestConfigurations } from './TestConfigurations'
import { mocks } from '~utils/tests'

const initTestConfigurations = overrides => {
  const mockProps = {
    match: {
      url: '/test-configurations',
    },
  }
  const wrapper = shallow(
    <TestConfigurations classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: TestConfigurations', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initTestConfigurations()
      expect(wrapper).toBeTruthy()
    })
  })
})
