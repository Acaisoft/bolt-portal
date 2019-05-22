import React from 'react'

import { Button, withStyles } from '@material-ui/core'

import styles from './ButtonWithIcon.styles'

function ButtonWithIcon({
  children,
  classes,
  button: ButtonComponent = Button,
  icon: IconComponent,
  ...buttonProps
}) {
  return (
    <ButtonComponent {...buttonProps}>
      {IconComponent && <IconComponent className={classes.icon} />}
      {children}
    </ButtonComponent>
  )
}

export default withStyles(styles)(ButtonWithIcon)
