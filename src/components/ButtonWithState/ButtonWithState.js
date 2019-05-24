import React from 'react'
import classNames from 'classnames'

import { CircularProgress, withStyles } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

import { ButtonWithIcon } from '~components'

import styles from './ButtonWithState.styles'

function ButtonWithState({
  children,
  classes,
  className,
  loading = false,
  success = false,
  error = false,
  ...buttonProps
}) {
  let icon
  if (loading) {
    icon = props => (
      <CircularProgress
        color="inherit"
        variant="indeterminate"
        size={15}
        {...props}
      />
    )
  } else if (error) {
    icon = Close
  } else if (success) {
    icon = Check
  }

  return (
    <ButtonWithIcon
      {...buttonProps}
      className={classNames(className, {
        [classes.error]: error,
        [classes.success]: success,
      })}
      icon={icon}
    >
      {children}
    </ButtonWithIcon>
  )
}

export default withStyles(styles)(ButtonWithState)
