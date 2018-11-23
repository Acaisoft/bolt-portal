import React from 'react'
import { shallow } from 'enzyme'

import { Layout } from './Layout'
import { mocks } from '~utils/tests'

jest.mock('./Authorized', () => 'AuthorizedMock')
jest.mock('./Guest', () => 'GuestMock')
jest.mock('./GlobalMessage', () => 'GlobalMessageMock')

const initLayout = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <Layout classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { mockProps, wrapper }
}

describe('layout: Layout', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initLayout()
      expect(wrapper).toBeTruthy()
    })

    it('should render Authorized if user is authorized and app is ready', () => {
      const { wrapper } = initLayout({ isAuthorized: true })
      expect(wrapper.find('AuthorizedMock').length).toBe(1)
    })

    it('should render Guest if user is not authorized', () => {
      const { wrapper } = initLayout({ isAuthorized: false })
      expect(wrapper.find('GuestMock').length).toBe(1)
    })
  })
})
