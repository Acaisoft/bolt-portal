import React from 'react'
import { shallow } from 'enzyme'

import { Details } from './Details'
import { mocks } from '~utils/tests'

jest.mock('./components/ConfigurationInfo', () => 'ConfigurationInfoMock')
jest.mock('./components/ConfigurationActions', () => 'ConfigurationActionsMock')

const initDetails = overrides => {
  const mockProps = {
    match: {
      url: '/projects/project-1/test-execs',
      params: {
        configurationId: 'configuration-123',
      },
    },
  }
  const wrapper = shallow(
    <Details classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: Details', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initDetails()
      expect(wrapper).toBeTruthy()
    })
  })
})
