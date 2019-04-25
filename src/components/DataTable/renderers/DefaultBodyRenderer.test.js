import React from 'react'
import { shallow } from 'enzyme'

import { mocks } from '~utils/tests'

import DefaultBodyRenderer from './DefaultBodyRenderer'
import { children, columnSettings, data } from '../DataTable.test.mock'

const initBodyRenderer = overrides => {
  const mockProps = {
    checkboxKey: row => row.id,
    classes: mocks.ClassesProxy,
    columns: columnSettings,
    data,
    handleSelect: jest.fn(id => jest.fn()),
    rowKey: row => row.id,
    ...overrides,
  }

  const wrapper = shallow(<DefaultBodyRenderer {...mockProps} />)
  return { mockProps, wrapper }
}

describe('component: DefaultBodyRenderer', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initBodyRenderer()
      expect(wrapper).toBeTruthy()
    })

    it('should render cells according to column settings', () => {
      const { wrapper } = initBodyRenderer({ children })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render loader if isLoading is set', () => {
      const { wrapper } = initBodyRenderer({ children, isLoading: true })
      expect(wrapper).toMatchSnapshot()
    })

    describe('checkboxes', () => {
      it('should render checkboxes in each row', () => {
        const { wrapper } = initBodyRenderer({ children, checkboxes: true })
        expect(wrapper.find('CheckboxMock').length).toBe(2)
      })

      it('should not render checkboxes if checkboxes prop is set to false', () => {
        const { wrapper } = initBodyRenderer({ children, checkboxes: false })
        expect(wrapper.find('CheckboxMock').length).toBe(0)
      })

      it('should check selected checkboxes', () => {
        const { wrapper } = initBodyRenderer({
          children,
          checkboxes: true,
          selected: new Set([2]),
        })

        expect(wrapper.find('CheckboxMock').at(0)).toHaveProp('checked', false)
        expect(wrapper.find('CheckboxMock').at(1)).toHaveProp('checked', true)
      })

      it('should generate select handler for each checkbox', () => {
        const { mockProps } = initBodyRenderer({
          children,
          checkboxes: true,
        })

        expect(mockProps.handleSelect).toHaveBeenCalledTimes(2)
      })
    })
  })
})
