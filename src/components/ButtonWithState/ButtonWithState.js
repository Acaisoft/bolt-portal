import React from 'react'
import classNames from 'classnames'

import { CircularProgress } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

import { Button } from 'components'

import useStyles from './ButtonWithState.styles'

function ButtonWithState({
  children,
  className,
  loading = false,
  success = false,
  error = false,
  ...buttonProps
}) {
  const classes = useStyles()

  let icon
  if (loading) {
    icon = props => (
      <CircularProgress
        data-testid="loader"
        color="inherit"
        variant="indeterminate"
        size={15}
        {...props}
      />
    )
  } else if (error) {
    icon = props => <Close data-testid="error" {...props} />
  } else if (success) {
    icon = props => <Check data-testid="success" {...props} />
  }

  return (
    <Button
      {...buttonProps}
      className={classNames(className, {
        [classes.error]: error,
        [classes.success]: success,
      })}
      icon={icon}
    >
      {children}
    </Button>
  )
}

export default ButtonWithState
