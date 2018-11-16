import React from 'react'
import { shallow } from 'enzyme'

import { Details } from './Details'

const initDetails = overrides => {
  const mockProps = {
    match: {
      params: {
        id: '123',
      },
    },
  }
  const wrapper = shallow(<Details {...mockProps} {...overrides} />)
  return { wrapper }
}

describe('page: Products/Details', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDetails()
      expect(wrapper).toBeTruthy()
    })
  })
})
