import React from 'react'
import { shallow } from 'enzyme'

import { mocks } from '~utils/tests'

import { List } from './List'

const initList = overrides => {
  const mockProps = {
    match: {
      url: '/projects',
    },
  }
  const wrapper = shallow(
    <List classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: Projects/List', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initList()
      expect(wrapper).toBeTruthy()
    })
  })
})
