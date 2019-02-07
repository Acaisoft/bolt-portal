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
  return { instance, mockProps, wrapper }
}

describe('page: Projects/List', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initList()
      expect(wrapper).toBeTruthy()
    })
  })
  describe('events', () => {
    describe('handleOpenForm', () => {
      it('should open drawer and change openForm state to true', () => {
        const { instance } = initList()
        instance.handleOpenForm()
        expect(instance.state.openForm).toBe(true)
      })
    })
  })
  describe('events', () => {
    describe('handleClose', () => {
      it('should close drawer and change openForm state to false', () => {
        const { instance } = initList()
        instance.handleClose()
        expect(instance.state.openForm).toBe(false)
      })
    })
  })
})
