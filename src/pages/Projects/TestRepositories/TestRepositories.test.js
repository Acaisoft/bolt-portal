import React from 'react'
import { shallow } from 'enzyme'

import { TestRepositories } from './TestRepositories'
import { mocks } from '~utils/tests'

jest.mock('./components/RepositoryForm', () => 'RepositoryFormMock')

const initComponent = overrides => {
  const mockProps = {
    classes: {},
  }
  const wrapper = shallow(
    <TestRepositories classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  const instance = wrapper.instance()
  return { instance, wrapper }
}

describe('page: TestRepositories', () => {
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
  describe('events', () => {
    describe('toggleDrawer', () => {
      it('should open new-project drawer and change status state to true', () => {
        const { instance } = initComponent()
        instance.toggleDrawer('create', true)
        expect(instance.state.open).toBe(true)
        expect(instance.state.type).toBe('create')
      })
      it('should close new-project drawer and change status state to true', () => {
        const { instance } = initComponent()
        instance.toggleDrawer('create', false)
        expect(instance.state.open).toBe(false)
        expect(instance.state.type).toBe('create')
      })

      it('should close udpdate-project drawer and change status state to true', () => {
        const { instance } = initComponent()
        instance.toggleDrawer('update', false)
        expect(instance.state.open).toBe(false)
        expect(instance.state.type).toBe('update')
      })
    })
    describe('openUpdateProject', () => {
      it('should open update-project drawer with initial form data', () => {
        const { instance } = initComponent()
        const name = 'testName'
        const url = 'http://fakeUrl.com'
        const event = {
          preventDefault() {},
        }
        instance.updateFormDrawer(event, name, url)
        expect(instance.state.updateFormValues.name).toBe('testName')
        expect(instance.state.updateFormValues.url).toBe('http://fakeUrl.com')
      })
    })
    describe('addTestConfigs', () => {
      it('should create new text with divider', () => {
        const { instance } = initComponent()
        const fakeConfigs = [
          { configurationType: { name: 'fakeName1' } },
          { configurationType: { name: 'fakeName2' } },
        ]
        const result = instance.addTestConfigs(fakeConfigs)
        expect(result).toBe('fakeName1 | fakeName2')
      })
      it('should create new text without divider', () => {
        const { instance } = initComponent()
        const fakeConfigs = [{ configurationType: { name: 'fakeName1' } }]
        const result = instance.addTestConfigs(fakeConfigs)
        expect(result).toBe('fakeName1')
      })
    })
  })
})
