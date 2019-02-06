import React from 'react'
import { shallow } from 'enzyme'

import { Sidebar } from './Sidebar'
import { mocks } from '~utils/tests'

const initSidebar = overrides => {
  const wrapper = shallow(<Sidebar classes={mocks.ClassesProxy} {...overrides} />)
  return { wrapper }
}

describe('layout: Sidebar', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initSidebar()
      expect(wrapper).toBeTruthy()
    })

    it('should render properly', () => {
      const { wrapper } = initSidebar()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
