import React from 'react'
import { shallow } from 'enzyme'

import DefaultHeaderRenderer from './DefaultHeaderRenderer'
import { children, columnSettings, data } from '../DataTable.test.mock'

const initBodyRenderer = overrides => {
  const mockProps = {
    columns: columnSettings,
    data,
    handleSelectAll: jest.fn(),
    selected: new Set(),
    ...overrides,
  }

  const wrapper = shallow(<DefaultHeaderRenderer {...mockProps} />)
  return { mockProps, wrapper }
}

describe('component: DefaultHeaderRenderer', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initBodyRenderer()
      expect(wrapper).toBeTruthy()
    })

    it('should render checkbox for select-all action only if multiselect is set to true', () => {
      const { wrapper } = initBodyRenderer({ children, checkboxes: true })
      expect(wrapper.find('CheckboxMock').length).toBe(0)
      wrapper.setProps({ multiselect: true })
      expect(wrapper.find('CheckboxMock').length).toBe(1)
    })

    it('should call handleSelectAll on checkbox click', () => {
      const { mockProps, wrapper } = initBodyRenderer({
        children,
        checkboxes: true,
        multiselect: true,
      })
      expect(mockProps.handleSelectAll).not.toHaveBeenCalled()

      wrapper.find('CheckboxMock').simulate('change')

      expect(mockProps.handleSelectAll).toHaveBeenCalled()
    })

    it('should check the select-all checkbox only if all rows are selected', () => {
      const { wrapper } = initBodyRenderer({
        children,
        checkboxes: true,
        multiselect: true,
        selected: new Set(),
      })
      expect(wrapper.find('CheckboxMock').prop('checked')).toBe(false)

      wrapper.setProps({ selected: new Set([1]) })
      expect(wrapper.find('CheckboxMock').prop('checked')).toBe(false)

      wrapper.setProps({ selected: new Set(data.map(x => x.id)) })
      expect(wrapper.find('CheckboxMock').prop('checked')).toBe(true)
    })

    it('should set the select-all checkbox to indeterminate state if only some rows are selected', () => {
      const { wrapper } = initBodyRenderer({
        children,
        checkboxes: true,
        multiselect: true,
        selected: new Set(),
      })

      expect(wrapper.find('CheckboxMock').prop('indeterminate')).toBe(false)

      wrapper.setProps({ selected: new Set([1]) })
      expect(wrapper.find('CheckboxMock').prop('indeterminate')).toBe(true)
    })
  })
})
