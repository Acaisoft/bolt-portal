import React from 'react'
import { shallow } from 'enzyme'

import { Project } from './Project'

import { mocks } from '~utils/tests'

const initProject = overrides => {
  const mockProps = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  }
  const wrapper = shallow(
    <Project {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component Projects/List - CreateProject', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProject()
      expect(wrapper).toBeTruthy()
    })
  })
})
