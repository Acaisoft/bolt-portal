import React from 'react'
import { shallow } from 'enzyme'

import { Products } from './Products'

jest.mock('./CreateEdit', () => 'CreateEdit')
jest.mock('./Details', () => 'Details')
jest.mock('./List', () => 'List')

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
