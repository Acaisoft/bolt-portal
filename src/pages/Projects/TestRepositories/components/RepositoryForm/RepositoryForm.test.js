import React from 'react'
import { shallow } from 'enzyme'

import { RepositoryForm } from './RepositoryForm'

import { mocks } from '~utils/tests'

const initComponent = overrides => {
  const mockProps = {
    open: false,
    close: jest.fn(),
  }
  const wrapper = shallow(
    <RepositoryForm {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component Projects/List - RepositoryForm', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
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
  })
})
