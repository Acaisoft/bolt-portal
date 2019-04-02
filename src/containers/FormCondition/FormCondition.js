import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'react-final-form'

function FormCondition({ when, is, elseDo = () => {}, children }) {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => {
        if (value === is) {
          return children
        }

        elseDo({ name: when, value })
      }}
    </Field>
  )
}
FormCondition.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  elseDo: PropTypes.func,
  is: PropTypes.any,
  when: PropTypes.string.isRequired,
}

export default FormCondition
