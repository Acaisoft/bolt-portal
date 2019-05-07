import React from 'react'
import PropTypes from 'prop-types'

import { Button, withStyles } from '@material-ui/core'

import styles from './LinkButton.styles'

function LinkButton({ classes, children, onClick, ...buttonProps }) {
  return (
    <Button
      className={classes.root}
      variant="text"
      color="inherit"
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(LinkButton)
