import React from 'react'
import { shallow } from 'enzyme'

import { mocks } from '~utils/tests'

import { Details } from './Details'

const initDetails = overrides => {
  const mockProps = {
    match: {
      url: '/projects/:projectId/details',
      params: {
        projectId: 'p123',
      },
    },
  }
  const wrapper = shallow(
    <Details classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('page: Projects/Details', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDetails()
      expect(wrapper).toBeTruthy()
    })
  })
})
