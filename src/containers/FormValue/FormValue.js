import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

// Used to read a form value without the boilerplate.
function FormValue({ children, name, ...fieldProps }) {
  return (
    <Field name={name} subscription={{ value: true }} {...fieldProps}>
      {({ input: { value } }) => children(value)}
    </Field>
  )
}
FormValue.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default FormValue
