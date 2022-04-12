import React from 'react'
import PropTypes from 'prop-types'

import { ArrowBack } from '@material-ui/icons'
import { Button } from 'components'

import ErrorPlaceholder from '../ErrorPlaceholder'

function NotFoundPlaceholder({
  title = 'Not Found',
  description,
  actions,
  ...sectionPlaceholderProps
}) {
  return (
    <ErrorPlaceholder
      {...sectionPlaceholderProps}
      title={title}
      description={description}
      actions={
        actions || (
          <Button icon={ArrowBack} variant="contained" color="primary" href="/">
            Go To Dashboard
          </Button>
        )
      }
    />
  )
}
NotFoundPlaceholder.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default NotFoundPlaceholder
