import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'formik'

import { mocks } from '~utils/tests'
import { FormField } from './FormField'

const fakeComponent = mocks.makeNamedComponent('FakeComponent')

const initFormField = overrides => {
  const mockProps = {}
  const wrapper = shallow(
    <FormField
      name="my-field"
      component={fakeComponent}
      {...mockProps}
      {...overrides}
    />
  )
  return { mockProps, wrapper }
}

describe('<FormField/>', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { wrapper } = initFormField()
      expect(wrapper).toBeTruthy()
    })

    it('renders Field component with proper name and passes render function', () => {
      const { wrapper } = initFormField()
      expect(wrapper.find('FieldMock').props()).toMatchObject({
        name: 'my-field',
        render: expect.any(Function),
      })
    })
  })

  describe('renderInput', () => {
    const { wrapper } = initFormField()
    const instance = wrapper.instance()
    const Input = instance.renderInput

    it('should render provided component and pass input props', () => {
      wrapper.setProps({ helperText: 'Helper Text' })
      const field = { value: 'some value' }
      const form = { touched: {}, errors: {} }
      const renderedInput = shallow(<Input form={form} field={field} />)

      expect(renderedInput.props()).toMatchObject({
        error: false,
        helperText: 'Helper Text',
        value: 'some value',
      })
    })

    it('should render error in helper text only if the field was touched', () => {
      const field = { value: 'some value' }
      let form = { touched: {}, errors: {} }

      let renderedInput = shallow(<Input form={form} field={field} />)
      expect(renderedInput.props()).toMatchObject({
        error: false,
        helperText: 'Helper Text',
      })

      form = {
        touched: { 'my-field': true },
        errors: { 'my-field': 'Some error' },
      }
      renderedInput = shallow(<Input form={form} field={field} />)
      expect(renderedInput.props()).toMatchObject({
        error: true,
        helperText: 'Some error',
      })
    })

    it('should render helper text if it was provided and there are no errors', () => {
      wrapper.setProps({ helperText: 'Helper Text' })
      const field = { value: 'some value' }
      let form = { touched: {}, errors: {} }

      let renderedInput = shallow(<Input form={form} field={field} />)
      expect(renderedInput.props()).toMatchObject({
        error: false,
        helperText: 'Helper Text',
      })

      wrapper.setProps({ helperText: undefined })
      renderedInput = shallow(<Input form={form} field={field} />)
      expect(renderedInput.props()).toMatchObject({
        error: false,
        helperText: '',
      })
    })
  })
})
