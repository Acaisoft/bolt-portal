import React from 'react'
import { shallow } from 'enzyme'

import { Layout } from './Layout'
import { mocks } from '~utils/tests'

jest.mock('./Authorized', () => 'AuthorizedMock')
jest.mock('./Guest', () => 'GuestMock')

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
  })
})
