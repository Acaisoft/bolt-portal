import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import GuestPages from '~pages/Guest'

import styles from './Guest.styles'

export function Guest({ classes }) {
  return (
    <div className={classes.root}>
      <div>
        <div>Guest Routes</div>
        <GuestPages />
      </div>
    </div>
  )
}
Guest.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Guest))
