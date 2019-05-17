import React from 'react'
import { shallow } from 'enzyme'

import { Authorized } from './Authorized'
import { ClassesProxy } from '~utils/tests/mocks'

jest.mock('~pages/Authorized', () => 'AuthorizedMock')

const initAuthorizedRoutes = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <Authorized classes={ClassesProxy} {...mockProps} {...overrides} />
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
