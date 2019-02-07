import React from 'react'
import { shallow } from 'enzyme'

import { CreateProject } from './CreateProject'

import { mocks } from '~utils/tests'

const initCreateProject = overrides => {
  const mockProps = {
    open: false,
    close: jest.fn(),
  }
  const wrapper = shallow(
    <CreateProject {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component Projects/List - CreateProject', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initCreateProject()
      expect(wrapper).toBeTruthy()
    })
  })
  describe('events', () => {
    describe('handleSubmit', () => {
      it('should close drawer', () => {
        const { instance, mockProps } = initCreateProject()
        instance.handleSubmit()
        expect(mockProps.close).toHaveBeenCalled()
      })
    })
  })
})
