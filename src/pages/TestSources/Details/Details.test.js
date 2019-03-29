import React from 'react'
import { shallow } from 'enzyme'

import { Details } from './Details'
import { mocks } from '~utils/tests'

const initDetails = overrides => {
  const mockProps = {
    match: {
      url: '/projects/project-1/test-sources/source-2',
      path: '/projects/:projectId/test-sources/:testSourceId',
      params: {
        testSourceId: 'source-2',
      },
    },
  }
  const wrapper = shallow(
    <Details classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: Details', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDetails()
      expect(wrapper).toBeTruthy()
    })
  })
})
