import React from 'react'
import { shallow } from 'enzyme'

import { App } from './App'

const initApp = overrides => {
  const mockProps = {}
  const wrapper = shallow(<App {...mockProps} {...overrides} />)
  return { mockProps, wrapper }
}

describe('global: App', () => {
  it('renders without crashing', () => {
    const { wrapper } = initApp()
    expect(wrapper).toBeTruthy()
  })
})
