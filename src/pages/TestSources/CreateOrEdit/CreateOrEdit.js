import React, { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import routes from 'config/routes'
import { getUrl } from 'utils/router'

import { TestSourceForm } from './components'

export function CreateOrEdit() {
  const navigate = useNavigate()
  const params = useParams()
  const { projectId, sourceId } = params
  const mode = sourceId ? 'edit' : 'create'

  const goToList = useCallback(() => {
    navigate(getUrl(routes.projects.sources.list, { ...params }))
  }, [navigate, params])

  const handleSubmit = useCallback(
    values => {
      goToList()
    },
    [goToList]
  )

  const handleCancel = useCallback(() => {
    goToList()
  }, [goToList])

  return (
    <TestSourceForm
      mode={mode}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      projectId={projectId}
      sourceId={sourceId}
    />
  )
}

export default CreateOrEdit
