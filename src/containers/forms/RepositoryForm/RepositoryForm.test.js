import React from 'react'
import { shallow } from 'enzyme'

import { RepositoryForm } from './RepositoryForm'

import { mocks } from '~utils/tests'

jest.mock('~components', () => ({
  KeyRepositoryModal: 'KeyRepositoryModal',
}))

const initComponent = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <RepositoryForm {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component: RepositoryForm', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initComponent()
      expect(wrapper).toBeTruthy()
    })
  })
})
