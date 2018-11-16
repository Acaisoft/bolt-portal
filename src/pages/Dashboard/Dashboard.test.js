import React from 'react'
import { shallow } from 'enzyme'

import { Dashboard } from './Dashboard'
import { mocks } from '~utils/tests'

const initDashboard = overrides => {
  const mockProps = {
    match: {
      url: '/dashboard',
    },
  }
  const wrapper = shallow(
    <Dashboard classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: Dashboard', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDashboard()
      expect(wrapper).toBeTruthy()
    })
  })
})
