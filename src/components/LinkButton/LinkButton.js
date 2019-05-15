import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Button, withStyles } from '@material-ui/core'

import styles from './LinkButton.styles'

function LinkButton({ children, classes, href, onClick, title, ...buttonProps }) {
  return (
    <Button
      component={Link}
      className={classes.root}
      variant="text"
      color="inherit"
      onClick={onClick}
      title={title}
      aria-label={title}
      to={href}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

LinkButton.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
}

export default withStyles(styles)(LinkButton)
