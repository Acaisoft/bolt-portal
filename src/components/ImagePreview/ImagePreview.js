import React from 'react'
import PropTypes from 'prop-types'

import useStyles from './ImagePreview.styles'

function ImagePreview({ alt, src }) {
  const classes = useStyles()

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
  src: PropTypes.string,
}

export default ImagePreview
