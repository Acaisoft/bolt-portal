import React from 'react'
import { shallow } from 'enzyme'

import { Loader } from './Loader'

const initLoader = overrides => {
  const mockProps = {
    children: <div id="testDiv">Hejka</div>,
    classes: {},
  }
  const wrapper = shallow(<Loader {...mockProps} {...overrides} />)
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component: Loader', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initLoader()
      expect(wrapper).toBeTruthy()
    })

    it('should render as expected', () => {
      const { wrapper } = initLoader()
      expect(wrapper).toMatchSnapshot()
    })

    it('should render as expected when loading', () => {
      const { wrapper } = initLoader({ loading: true })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render as expected when loading and when fill=true', () => {
      const { wrapper } = initLoader({ loading: true, fill: true })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render loader and child when loading', () => {
      const { wrapper } = initLoader({ loading: true })
      expect(wrapper.find('RenderLoader').length).toBe(1)
      expect(wrapper.find('#testDiv').length).toBe(0)
    })

    it('should render child when not loading', () => {
      const { wrapper } = initLoader({ loading: false })
      expect(wrapper.find('CricularProgressMock').length).toBe(0)
      expect(wrapper.find('#testDiv').length).toBe(1)
    })
  })
})
