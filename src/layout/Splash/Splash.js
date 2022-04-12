import React from 'react'

import { LoadingPlaceholder } from 'components'

import useStyles from './Splash.styles'

function Splash() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LoadingPlaceholder title="Initializing Acai Bolt..." />
    </div>
  )
}

export default Splash
