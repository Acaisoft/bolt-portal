import React from 'react'
import { shallow } from 'enzyme'

import { ProjectForm } from './ProjectForm'

import { mocks } from '~utils/tests'

const initProjectForm = overrides => {
  const mockProps = {
    open: false,
    close: jest.fn(),
  }
  const wrapper = shallow(
    <ProjectForm {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component Projects/List - CreateProject', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProjectForm()
      expect(wrapper).toBeTruthy()
    })
  })
  describe('events', () => {
    describe('handleSubmit', () => {
      it('should close drawer', () => {
        const { instance, mockProps } = initProjectForm()
        const values = {}
        const addProjectMock = jest.fn()
        instance.handleSubmit(values, { addProjectMock })
        expect(mockProps.close).toHaveBeenCalled()
      })
    })
  })
})
