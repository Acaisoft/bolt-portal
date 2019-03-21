import React from 'react'
import { shallow } from 'enzyme'

import { Repository } from './Repository'

import { mocks } from '~utils/tests'

jest.mock('~components', () => ({
  KeyRepositoryModal: 'KeyRepositoryModal',
}))

const initComponent = overrides => {
  const mockProps = {
    open: false,
    close: jest.fn(),
  }
  const wrapper = shallow(
    <Repository {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component: Repository', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
    it('should render as expected', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('events', () => {
    describe('handleSubmit', () => {
      it('should close drawer', () => {
        const { instance, mockProps } = initComponent()
        const values = {}
        const addProjectMock = jest.fn()
        instance.handleSubmit(values, { addProjectMock })
        expect(mockProps.close).toHaveBeenCalled()
      })
    })
    describe('handleModalOpen', () => {
      it('should open modal', () => {
        const { instance } = initComponent()
        instance.handleModalOpen()
        expect(instance.state.openModal).toBe(true)
      })
      it('should close modal', () => {
        const { instance } = initComponent()
        instance.handleModalClose()
        expect(instance.state.openModal).toBe(false)
      })
    })
  })
})
