import React from 'react'
import { shallow } from 'enzyme'

import { Projects } from './Projects'

const initProjects = overrides => {
  const mockProps = {
    match: {
      url: '/Products',
    },
  }
  const wrapper = shallow(<Projects {...mockProps} {...overrides} />)
  return { wrapper }
}

describe('page: Products', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProjects()
      expect(wrapper).toBeTruthy()
    })
  })
})
