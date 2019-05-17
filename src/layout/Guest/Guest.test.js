import React from 'react'
import { shallow } from 'enzyme'

import { Guest } from './Guest'
import { ClassesProxy } from '~utils/tests/mocks'

const initGuest = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <Guest classes={ClassesProxy} {...mockProps} {...overrides} />
  )
  return { mockProps, wrapper }
}

describe('layout: Guest', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initGuest()
      expect(wrapper).toBeTruthy()
    })
  })
})
