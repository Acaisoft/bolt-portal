import React from 'react'

import { IconButton } from '@material-ui/core'
import { ZoomIn, ZoomOut } from '@material-ui/icons'

function ZoomButton({ isZoomed, onZoomIn, onZoomOut }) {
  return isZoomed ? (
    <IconButton onClick={onZoomOut}>
      <ZoomOut />
    </IconButton>
  ) : (
    <IconButton onClick={onZoomIn}>
      <ZoomIn />
    </IconButton>
  )
}

export default ZoomButton
