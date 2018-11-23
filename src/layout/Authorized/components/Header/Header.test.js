import React from 'react'
import { shallow } from 'enzyme'

import { Header } from './Header'
import { mocks } from '~utils/tests'

jest.mock('./components/Nav', () => 'NavMock')
jest.mock('./components/UserInfo', () => 'UserInfoMock')

const initHeader = overrides => {
  const wrapper = shallow(<Header classes={mocks.ClassesProxy} {...overrides} />)
  return { wrapper }
}

describe('layout: Header', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initHeader()
      expect(wrapper).toBeTruthy()
    })
  })
})
