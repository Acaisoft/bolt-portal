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
    describe('toggleDrawer', () => {
      it('should open new-project drawer and change status state to true', () => {
        const { instance } = initList()
        instance.toggleDrawer('create', true)
        expect(instance.state.open).toBe(true)
        expect(instance.state.type).toBe('create')
      })
      it('should close new-project drawer and change status state to true', () => {
        const { instance } = initList()
        instance.toggleDrawer('create', false)
        expect(instance.state.open).toBe(false)
        expect(instance.state.type).toBe('create')
      })

      it('should close udpdate-project drawer and change status state to true', () => {
        const { instance } = initList()
        instance.toggleDrawer('update', false)
        expect(instance.state.open).toBe(false)
        expect(instance.state.type).toBe('update')
      })
    })
    describe('openUpdateProject', () => {
      it('should open update-project drawer with initial form data', () => {
        const { instance } = initList()
        const name = 'testName'
        const description = 'testDesc'
        const event = {
          preventDefault() {},
        }
        instance.openUpdateProject(event, name, description)
        expect(instance.state.updateFormValues.name).toBe('testName')
        expect(instance.state.updateFormValues.description).toBe('testDesc')
      })
    })
  })
})
