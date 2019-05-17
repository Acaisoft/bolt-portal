import React from 'react'
import { shallow } from 'enzyme'

import { TestConfigurations } from './TestConfigurations'
import { ClassesProxy } from '~utils/tests/mocks'

const initTestConfigurations = overrides => {
  const mockProps = {
    match: {
      path: '/test-configurations',
      url: '/test-configurations',
    },
  }
  const wrapper = shallow(
    <TestConfigurations classes={ClassesProxy} {...mockProps} {...overrides} />
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
