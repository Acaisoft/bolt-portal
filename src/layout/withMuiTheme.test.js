import React from 'react'
import { shallow } from 'enzyme'

import withMuiTheme from './withMuiTheme'
import { mocks } from '~utils/tests'

const FakeComponent = mocks.makeNamedComponent('FakeComponent')

const initWithMuiTheme = (overrides, injectedTheme) => {
  const HOC = withMuiTheme(FakeComponent, injectedTheme)
  const wrapper = shallow(<HOC {...overrides} />)
  return { wrapper }
}

describe('layout: withMuiTheme', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initWithMuiTheme({}, { fake: 'theme' })
      expect(wrapper).toMatchSnapshot()
    })

    it('should pass props to the wrapped component', () => {
      const { wrapper } = initWithMuiTheme({ some: 'value' })
      expect(wrapper.find('FakeComponent').prop('some')).toBe('value')
    })
  })

  describe('HOC', () => {
    it("should read wrapped component's name", () => {
      const WrappedComponent = mocks.makeUnnamedComponent()
      expect(withMuiTheme(WrappedComponent).displayName).toBe('withMuiTheme()')

      WrappedComponent.name = 'SomeName'
      expect(withMuiTheme(WrappedComponent).displayName).toBe(
        'withMuiTheme(SomeName)'
      )

      WrappedComponent.displayName = 'SomeDisplayName'
      expect(withMuiTheme(WrappedComponent).displayName).toBe(
        'withMuiTheme(SomeDisplayName)'
      )
    })
  })
})
