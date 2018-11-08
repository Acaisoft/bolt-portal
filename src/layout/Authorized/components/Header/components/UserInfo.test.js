import React from 'react'
import { shallow } from 'enzyme'

import { UserInfo } from './UserInfo'
import { mocks } from '~utils/tests'

const initUserInfo = overrides => {
  const mockProps = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
  }
  const wrapper = shallow(
    <UserInfo classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()

  return { instance, mockProps, wrapper }
}

describe('layout: UserInfo', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initUserInfo()
      expect(wrapper).toBeTruthy()
    })

    it('should render properly', () => {
      const { wrapper } = initUserInfo()
      expect(wrapper).toMatchSnapshot()
    })

    it('should render open menu properly', () => {
      const { wrapper } = initUserInfo()
      wrapper.setState({ anchor: 'fake ref' })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('events', () => {
    describe('handleMenuOpen', () => {
      it('should set menu anchor', () => {
        const fakeEvent = { currentTarget: 'fake current target' }
        const { instance } = initUserInfo()

        instance.handleMenuOpen(fakeEvent)

        expect(instance.state.anchor).toBe('fake current target')
      })
    })

    describe('handleMenuClose', () => {
      it('should clear menu anchor', () => {
        const { instance } = initUserInfo()

        instance.handleMenuClose()

        expect(instance.state.anchor).toBe(null)
      })
    })

    describe('handleLogout', () => {
      it('should call logout action', () => {
        const { instance, mockProps } = initUserInfo()

        instance.handleLogout()

        expect(mockProps.logout).toHaveBeenCalled()
      })
    })

    describe('handleMenuLink', () => {
      it('should return a function', () => {
        const { instance } = initUserInfo()

        const fn = instance.handleMenuLink('/example')

        expect(typeof fn).toBe('function')
      })

      it('should cache functions with the same route', () => {
        const { instance } = initUserInfo()

        const fn1 = instance.handleMenuLink('/example')
        const fn2 = instance.handleMenuLink('/example')

        expect(fn1).toBe(fn2)
      })

      it('should redirect to the route and close menu', () => {
        const { instance, mockProps } = initUserInfo()
        instance.handleMenuClose = jest.fn()

        const fn = instance.handleMenuLink('/example')
        fn()

        expect(mockProps.history.push).toHaveBeenCalledWith('/example')
        expect(instance.handleMenuClose).toHaveBeenCalled()
      })
    })
  })
})
