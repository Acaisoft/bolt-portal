import React from 'react'
import { shallow } from 'enzyme'

import { List } from './List'

jest.mock('~components/DataTable')

const initList = overrides => {
  const mockProps = {
    match: {
      url: '/products',
    },
  }
  const wrapper = shallow(<List {...mockProps} {...overrides} />)
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: Products/List', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initList()
      expect(wrapper).toBeTruthy()
    })

    it('should render DataTable with provided data', () => {
      const { wrapper } = initList()
      expect(wrapper).toMatchSnapshot()
    })

    it('should render action buttons for provided row data', () => {
      const fakeRowData = { id: 1, name: 'Fake product' }
      const { instance } = initList()
      const renderedActionButtons = shallow(instance.renderActions(fakeRowData))

      expect(renderedActionButtons).toMatchSnapshot()
    })
  })
})
