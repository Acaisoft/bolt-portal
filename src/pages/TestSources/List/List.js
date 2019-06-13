import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { TestSourcesList } from './components'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import useStyles from './List.styles'

export function List({ history, match }) {
  const { projectId } = match.params
  const classes = useStyles()

  const { getCreateTestSourceUrl, getEditTestSourceUrl } = useHandlers(
    history,
    match
  )

  return (
    <div className={classes.root}>
      <TestSourcesList
        projectId={projectId}
        getCreateTestSourceUrl={getCreateTestSourceUrl}
        getEditTestSourceUrl={getEditTestSourceUrl}
      />
    </div>
  )
}
List.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

function useHandlers(history, match) {
  const getRedirectUr = useCallback(
    (path, params = {}) => {
      return getUrl(path, { ...match.params, ...params })
    },
    [match]
  )

  const getCreateTestSourceUrl = useCallback(() => {
    return getRedirectUr(routes.projects.sources.create)
  }, [getRedirectUr])

  const getEditTestSourceUrl = useCallback(
    ({ id }) => {
      return getRedirectUr(routes.projects.sources.edit, { sourceId: id })
    },
    [getRedirectUr]
  )

  return {
    getCreateTestSourceUrl,
    getEditTestSourceUrl,
  }
}

export default List
