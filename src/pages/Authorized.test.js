import React from 'react'
import { shallow } from 'enzyme'

import { Authorized } from './Authorized'

jest.mock('./Projects', () => 'ProjectsMock')

const initAuthorized = overrides => {
  const wrapper = shallow(<Authorized {...overrides} />)
  return { wrapper }
}

describe('page: Authorized', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initAuthorized()
      expect(wrapper).toBeTruthy()
    })
  })
})
