import React from 'react'

import useStyles from './BackgroundImage.styles'

function BackgroundImage({ url }) {
  const classes = useStyles()

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

export default BackgroundImage
