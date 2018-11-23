import React from 'react'
import { shallow } from 'enzyme'

import { Products } from './Products'

jest.mock('./CreateEdit', () => 'CreateEditMock')
jest.mock('./Details', () => 'DetailsMock')
jest.mock('./List', () => 'ListMock')

const initProducts = overrides => {
  const mockProps = {
    match: {
      url: '/Products',
    },
  }
  const wrapper = shallow(<Products {...mockProps} {...overrides} />)
  return { wrapper }
}

describe('page: Products', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProducts()
      expect(wrapper).toBeTruthy()
    })
  })
})
