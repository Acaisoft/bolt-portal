import React from 'react'
import PropTypes from 'prop-types'

import { CircularProgress, Box } from '@material-ui/core'
import { LoadingPlaceholder as LoadingPlaceholderImage } from 'assets/icons'

import SectionPlaceholder from '../SectionPlaceholder'

function LoadingPlaceholder({
  title = 'Loading',
  description,
  actions,
  ...sectionPlaceholderProps
}) {
  return (
    <SectionPlaceholder
      {...sectionPlaceholderProps}
      title={title}
      description={description}
      topImage={<LoadingPlaceholderImage height={78} />}
      icon={
        <Box mr={1.5}>
          <CircularProgress color="primary" size={18} data-testid="loading-icon" />
        </Box>
      }
      actions={actions}
    />
  )
}
LoadingPlaceholder.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default LoadingPlaceholder
