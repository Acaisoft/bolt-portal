import React from 'react'
import { shallow } from 'enzyme'

import { CreateEdit } from './CreateEdit'

const initCreateEdit = overrides => {
  const mockProps = {
    match: {
      params: {},
    },
  }
  const wrapper = shallow(<CreateEdit {...mockProps} {...overrides} />)
  return { wrapper }
}

describe('page: Products/CreateEdit', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initCreateEdit()
      expect(wrapper).toBeTruthy()
    })

    it('should render edit form if id is set', () => {
      const { wrapper } = initCreateEdit({ match: { params: { id: '123' } } })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render create form if id is not set', () => {
      const { wrapper } = initCreateEdit({ match: { params: {} } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
