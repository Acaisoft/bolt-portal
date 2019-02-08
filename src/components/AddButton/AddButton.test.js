import React from 'react'
import { shallow } from 'enzyme'

import { AddButton } from './AddButton'

const initAddButton = overrides => {
  const mockProps = {
    open: jest.fn(),
  }
  const wrapper = shallow(<AddButton {...mockProps} {...overrides} />)
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component: AddButton', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initAddButton()
      expect(wrapper).toBeTruthy()
    })
  })
  describe('events', () => {
    describe('handleClick', () => {
      it('should induce props function open', () => {
        const { instance, mockProps } = initAddButton()
        instance.handleClick()
        expect(mockProps.open).toHaveBeenCalledWith('create', true)
      })
    })
  })
})
