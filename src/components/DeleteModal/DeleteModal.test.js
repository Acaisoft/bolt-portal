import React from 'react'
import { shallow } from 'enzyme'

import { DeleteModal } from './DeleteModal'

import { ClassesProxy } from '~utils/tests/mocks'

const initComponent = overrides => {
  const mockProps = {
    name: 'mockName',
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    type: 'mockType',
  }
  const wrapper = shallow(
    <DeleteModal {...mockProps} {...overrides} classes={ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component: DeleteModal', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
    it('should render as expected', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
