import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ProjectsList } from './components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

export function List({ history }) {
  const getProjectDetailsUrl = useCallback(
    ({ id }) => {
      return getUrl(routes.projects.details, { projectId: id })
    },
    [history]
  )

  return <ProjectsList getProjectDetailsUrl={getProjectDetailsUrl} />
}
List.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default List
