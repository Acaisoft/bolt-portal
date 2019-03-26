import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'

import styles from './ImagePreview.styles'

function ImagePreview({ alt, classes, src }) {
  if (!src) {
    return null
  }

  return (
    <div className={classes.root}>
      <img src={src} alt={alt} className={classes.image} />
    </div>
  )
}

ImagePreview.propTypes = {
  alt: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  src: PropTypes.string,
}

export default withStyles(styles)(ImagePreview)
