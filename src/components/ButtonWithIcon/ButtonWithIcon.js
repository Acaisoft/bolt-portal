import React from 'react'

import { Button } from '@material-ui/core'

import useStyles from './ButtonWithIcon.styles'

function ButtonWithIcon({
  children,
  button: ButtonComponent = Button,
  icon: IconComponent,
  ...buttonProps
}) {
  const classes = useStyles()

  return (
    <ButtonComponent {...buttonProps}>
      {IconComponent && <IconComponent className={classes.icon} />}
      {children}
    </ButtonComponent>
  )
}

export default ButtonWithIcon
