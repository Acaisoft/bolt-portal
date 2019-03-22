import React from 'react'
import { shallow } from 'enzyme'

import { DeleteModal } from './DeleteModal'

import { mocks } from '~utils/tests'

const initComponent = overrides => {
  const mockProps = {
    name: 'mockName',
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    type: 'mockType',
  }
  const wrapper = shallow(
    <DeleteModal {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
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
