import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button as MaterialButton } from '@material-ui/core'

import useStyles from './Button.styles'

export function Button({
  classes: overridingClasses,
  children,
  button: ButtonComponent = MaterialButton,
  icon: IconComponent,
  href,
  variant,
  ...buttonProps
}) {
  const classes = { ...useStyles(), ...overridingClasses }
  const linkButtonProps = href
    ? {
        to: href,
        component: Link,
      }
    : {}

  return (
    <ButtonComponent
      role="button"
      variant={variant === 'link' ? 'text' : variant}
      classes={{
        label: classes.label,
      }}
      className={classNames({
        [classes.link]: variant === 'link',
      })}
      {...linkButtonProps}
      {...buttonProps}
    >
      {IconComponent && <IconComponent className={classes.icon} />}
      {children}
    </ButtonComponent>
  )
}

Button.propTypes = {
  classes: PropTypes.object,
  variant: PropTypes.string,
  href: PropTypes.string,
}

export default Button
