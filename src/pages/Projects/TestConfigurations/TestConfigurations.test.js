import React from 'react'
import { shallow } from 'enzyme'

import { TestConfigurations } from './TestConfigurations'
import { mocks } from '~utils/tests'

jest.mock('~components', () => ({
  DataTable: 'DataTableMock',
  DeleteModal: 'DeleteModalMock',
}))

const initComponent = overrides => {
  const mockProps = {
    classes: {},
  }
  const wrapper = shallow(
    <TestConfigurations classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: TestConfigurations', () => {
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
      it('should close delete config and close modal', () => {
        const { instance } = initComponent()
        const fakeId = 'fakeID'
        const deleteConfigMock = jest.fn()
        instance.handleSubmit(fakeId, { deleteConfigMock })
        expect(instance.state.openDeleteModal).toBe(false)
      })
    })
    describe('handleModalOpen', () => {
      it('should open modal', () => {
        const { instance } = initComponent()
        const fakeID = 'faleId'
        const fakeName = 'fakeName'
        instance.handleModalOpen(fakeID, fakeName)
        expect(instance.state.openDeleteModal).toBe(true)
      })
      it('should close modal', () => {
        const { instance } = initComponent()
        instance.handleModalClose()
        expect(instance.state.openDeleteModal).toBe(false)
      })
    })
  })
})
