import React from 'react'
import { shallow } from 'enzyme'

import { ClassesProxy } from '~utils/tests/mocks'

import DefaultFooterRenderer from './DefaultFooterRenderer'
import { children, columnSettings, data } from '../DataTable.test.mock'

const initBodyRenderer = overrides => {
  const mockProps = {
    classes: ClassesProxy,
    columns: columnSettings,
    data,
    ...overrides,
  }

  const wrapper = shallow(<DefaultFooterRenderer {...mockProps} />)
  return { mockProps, wrapper }
}

describe('component: DefaultFooterRenderer', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initBodyRenderer()
      expect(wrapper).toBeTruthy()
    })

    it('should render loader if isLoading is set', () => {
      const { wrapper } = initBodyRenderer({ children, isLoading: true })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render footer cells according to column settings', () => {
      const { wrapper } = initBodyRenderer({ children })
      expect(
        wrapper
          .find('TableCellMock')
          .at(0)
          .text()
      ).toEqual('')
      expect(
        wrapper
          .find('TableCellMock')
          .at(1)
          .text()
      ).toEqual('Total age: 66')
    })
  })
})
