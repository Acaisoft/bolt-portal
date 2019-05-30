import React from 'react'

import { withStyles } from '@material-ui/core'
import { NoDataPlaceholder } from '~components'

import styles from './Splash.styles'

function Splash({ classes }) {
  return (
    <div className={classes.root}>
      <NoDataPlaceholder label="Initializing Acai Bolt..." />
    </div>
  )
}

export default React.memo(withStyles(styles)(Splash))
