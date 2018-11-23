import React from 'react'
import { shallow } from 'enzyme'

import { Guest } from './Guest'

jest.mock('./Login', () => 'LoginMock')

const initGuest = overrides => {
  const wrapper = shallow(<Guest {...overrides} />)
  return { wrapper }
}

describe('page: Guest', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initGuest()
      expect(wrapper).toBeTruthy()
    })
  })
})
