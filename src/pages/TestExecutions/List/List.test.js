import React from 'react'
import { shallow } from 'enzyme'

import { List } from './List'
import { mocks } from '~utils/tests'

const initList = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <List classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: List', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initList()
      expect(wrapper).toBeTruthy()
    })
  })
})
