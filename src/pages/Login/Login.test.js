import React from 'react'
import { shallow } from 'enzyme'

import { Login } from './Login'

const initLogin = overrides => {
  const wrapper = shallow(<Login {...overrides} />)
  return { wrapper }
}

describe('page: Login', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initLogin()
      expect(wrapper).toBeTruthy()
    })
  })
})
