import React from 'react'
import { shallow } from 'enzyme'

import { Repositories } from './Repositories'
import { mocks } from '~utils/tests'

const initRepositories = overrides => {
  const mockProps = {
    match: {
      path: '/test-configurations',
      url: '/test-configurations',
      params: {},
    },
  }
  const wrapper = shallow(
    <Repositories classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: Repositories', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initRepositories()
      expect(wrapper).toBeTruthy()
    })
  })
})
