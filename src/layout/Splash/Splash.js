import React from 'react'

import { NoDataPlaceholder } from '~components'

import useStyles from './Splash.styles'

function Splash() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NoDataPlaceholder label="Initializing Acai Bolt..." />
    </div>
  )
}

export default Splash
