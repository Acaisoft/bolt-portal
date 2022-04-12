import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TestSourcesList } from './components'

import routes from 'config/routes'
import { getUrl } from 'utils/router'

import useStyles from './List.styles'

export function List() {
  const navigate = useNavigate()
  const params = useParams()
  const { projectId } = params
  const classes = useStyles()

  const { getCreateTestSourceUrl, getEditTestSourceUrl } = useHandlers(
    navigate,
    params
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

function useHandlers(navigate, params) {
  const getRedirectUr = useCallback(
    (path, callbackParams = {}) => {
      return getUrl(path, { ...params, ...callbackParams })
    },
    [params]
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
