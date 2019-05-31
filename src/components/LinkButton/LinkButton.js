import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

import useStyles from './LinkButton.styles'

function LinkButton({ children, href, onClick, title, ...buttonProps }) {
  const classes = useStyles()

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
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
}

export default LinkButton
