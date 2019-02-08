import React from 'react'
import { shallow } from 'enzyme'

import { Projects } from './Projects'

jest.mock('./List', () => 'ListMock')

const initProjects = overrides => {
  const mockProps = {
    match: {
      url: '/projects',
    },
  }
  const wrapper = shallow(<Projects {...mockProps} {...overrides} />)
  return { wrapper }
}

describe('page: Projects', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProjects()
      expect(wrapper).toBeTruthy()
    })
  })
})
