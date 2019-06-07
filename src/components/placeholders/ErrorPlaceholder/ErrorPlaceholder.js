import React from 'react'
import PropTypes from 'prop-types'

import { Close } from '@material-ui/icons'
import { ErrorPlaceholder as ErrorPlaceholderImage } from '~assets/icons'
import SectionPlaceholder from '../SectionPlaceholder'

function ErrorPlaceholder({
  title = 'Error',
  error,
  actions,
  ...sectionPlaceholderProps
}) {
  return (
    <SectionPlaceholder
      {...sectionPlaceholderProps}
      title={title}
      description={error && error.message} // Add better GraphQL errors formatting
      topImage={<ErrorPlaceholderImage height={78} />}
      icon={<Close color="error" data-testid="error-icon" />}
      actions={actions}
    />
  )
}
ErrorPlaceholder.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default ErrorPlaceholder
