import React from 'react'

import { withStyles } from '@material-ui/core'

import styles from './BackgroundImage.styles'

function BackgroundImage({ classes, url }) {
  if (!url) {
    return null
  }

  return (
    <div
      className={classes.root}
      style={{
        background: `url(${url})`,
      }}
    />
  )
}

export default withStyles(styles)(BackgroundImage)
