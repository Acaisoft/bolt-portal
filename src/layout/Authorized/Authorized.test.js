import React from 'react'
import { shallow } from 'enzyme'

import { Authorized } from './Authorized'
import { mocks } from '~utils/tests'

jest.mock('./components/Header', () => 'Header')
jest.mock('~pages/Dashboard', () => 'Dashboard')

const initAuthorizedRoutes = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <Authorized classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { mockProps, wrapper }
}

describe('layout: AuthorizedRoutes', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initAuthorizedRoutes()
      expect(wrapper).toBeTruthy()
    })
  })
})
