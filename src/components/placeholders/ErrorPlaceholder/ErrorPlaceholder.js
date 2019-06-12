import React from 'react'
import PropTypes from 'prop-types'

import { Close } from '@material-ui/icons'
import { ErrorPlaceholder as ErrorPlaceholderImage } from '~assets/icons'
import SectionPlaceholder from '../SectionPlaceholder'

function ErrorPlaceholder({
  error,
  title,
  description,
  actions,
  ...sectionPlaceholderProps
}) {
  const parsedError = parseError(error)

  return (
    <SectionPlaceholder
      {...sectionPlaceholderProps}
      title={parsedError.title || title}
      description={parsedError.description || description}
      topImage={<ErrorPlaceholderImage height={78} />}
      icon={<Close color="error" data-testid="error-icon" />}
      actions={actions}
    />
  )
}
ErrorPlaceholder.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  error: PropTypes.object,
  title: PropTypes.string,
}

function parseError(error) {
  if (!error) {
    return {}
  }

  if ((error.graphQLErrors || []).length > 0) {
    return {
      title: 'GraphQL Error',
      description: error.graphQLErrors[0].message,
    }
  }

  if (error.networkError) {
    return {
      title: 'Network Error',
      description: error.networkError.message,
    }
  }

  return {
    title: error.name,
    description: error.message,
  }
}

export default ErrorPlaceholder
