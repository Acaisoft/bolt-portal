import React from 'react'

import { CircularProgress } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

import { ButtonWithIcon } from '~components'

function ButtonWithState({
  children,
  loading = false,
  success = false,
  error = false,
  ...buttonProps
}) {
  let icon = null
  if (loading) {
    icon = props => <CircularProgress variant="indeterminate" size={15} {...props} />
  } else if (error) {
    icon = props => <Close {...props} />
  } else if (success) {
    icon = props => <Check {...props} />
  }

  return (
    <ButtonWithIcon {...buttonProps} icon={icon}>
      {children}
    </ButtonWithIcon>
  )
}

export default ButtonWithState
