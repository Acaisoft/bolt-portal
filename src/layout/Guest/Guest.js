import React from 'react'

import { withRouter } from 'react-router-dom'

import GuestPages from '~pages/Guest'

import useStyles from './Guest.styles'

export function Guest() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <div>Guest Routes</div>
        <GuestPages />
      </div>
    </div>
  )
}

export default withRouter(Guest)
