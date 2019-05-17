import React from 'react'
import { shallow } from 'enzyme'

import { Container } from './Container'
import { ClassesProxy } from '~utils/tests/mocks'

const initContainer = overrides => {
  const wrapper = shallow(<Container classes={ClassesProxy} {...overrides} />)
  return { wrapper }
}

describe('component: Container', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initContainer()
      expect(wrapper).toBeTruthy()
    })

    it('should render children', () => {
      const { wrapper } = initContainer({
        children: <div id="fake">fake child</div>,
      })
      expect(wrapper.find('#fake').length).toBe(1)
    })
  })
})
