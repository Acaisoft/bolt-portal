import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import { TestSourceForm } from './components'

export function CreateOrEdit({ history, match }) {
  const { projectId, sourceId } = match.params
  const mode = sourceId ? 'edit' : 'create'

  const goToList = useCallback(() => {
    history.push(getUrl(routes.projects.sources.list, { ...match.params }))
  }, [history, match.params])

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
CreateOrEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      sourceId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default CreateOrEdit
