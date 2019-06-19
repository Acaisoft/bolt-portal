import React from 'react'
import PropTypes from 'prop-types'

import { TextField } from 'final-form-material-ui'
import { Field } from 'react-final-form'

function FormField({
  children,
  component = TextField,
  field: { inputProps = {} } = {},
  name,
  subscription = {
    value: true,
    error: true,
    touched: true,
    submitError: true,
    dirtySinceLastSubmit: true,
  },
  ...rest
}) {
  return (
    <Field component={component} name={name} {...inputProps} {...rest}>
      {children}
    </Field>
  )
}
FormField.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  field: PropTypes.shape({
    inputProps: PropTypes.object,
  }),
  name: PropTypes.string.isRequired,
  ...Field.propTypes,
}

export default FormField
