import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Field, getIn } from 'formik'
import { TextField } from '@material-ui/core'

export class FormField extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  static defaultProps = {
    component: TextField,
  }

  renderInput = ({ field, form }) => {
    const { children, component: Component, name, ...inputProps } = this.props

    const errors = getIn(form.touched, name) && getIn(form.errors, name)
    const helperText = inputProps.helperText || ''

    return (
      <Component
        {...field}
        {...inputProps}
        error={!!errors}
        helperText={errors || helperText}
      >
        {children}
      </Component>
    )
  }

  render() {
    const { name } = this.props

    return <Field name={name} render={this.renderInput} />
  }
}

export default FormField
