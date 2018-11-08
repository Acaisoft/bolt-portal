import React from 'react'
import { shallow } from 'enzyme'

import { Nav } from './Nav'
import { mocks } from '~utils/tests'

const initNav = overrides => {
  const wrapper = shallow(<Nav classes={mocks.ClassesProxy} {...overrides} />)
  return { wrapper }
}

describe('layout: Nav', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initNav()
      expect(wrapper).toBeTruthy()
    })
  })
})
