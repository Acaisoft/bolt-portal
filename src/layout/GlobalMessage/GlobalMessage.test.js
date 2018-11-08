import React from 'react'
import { shallow } from 'enzyme'

import { GlobalMessage } from './GlobalMessage'

const initGlobalMessage = overrides => {
  const mockProps = {
    hideMessage: jest.fn(),
    showMessage: jest.fn(),
  }
  const wrapper = shallow(<GlobalMessage {...mockProps} {...overrides} />)
  return { mockProps, wrapper }
}

describe('layout: GlobalMessage', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initGlobalMessage()
      expect(wrapper).toBeTruthy()
    })
  })

  describe('events', () => {
    describe('handleClose', () => {
      const { mockProps, wrapper } = initGlobalMessage()
      const instance = wrapper.instance()
      const fakeEvent = { fake: 'event' }

      beforeEach(() => {
        mockProps.hideMessage.mockClear()
      })

      it('should not call hideMessage if autoHideDuration is 0 and reason is timeout', () => {
        wrapper.setProps({ autoHideDuration: 0 })
        instance.handleClose(fakeEvent, 'timeout')
        expect(mockProps.hideMessage).not.toHaveBeenCalled()
      })

      it('should call hideMessage if autoHideDuration > 0 or reason === timeout', () => {
        wrapper.setProps({ autoHideDuration: 3000 })
        instance.handleClose(fakeEvent, 'timeout')
        expect(mockProps.hideMessage).toHaveBeenLastCalledWith('timeout')

        wrapper.setProps({ autoHideDuration: 3000 })
        instance.handleClose(fakeEvent, 'close')
        expect(mockProps.hideMessage).toHaveBeenLastCalledWith('close')

        wrapper.setProps({ autoHideDuration: 0 })
        instance.handleClose(fakeEvent, 'close')
        expect(mockProps.hideMessage).toHaveBeenLastCalledWith('close')
      })
    })
  })
})
