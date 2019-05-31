import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ConfigurationForm } from './components'
import { getUrl } from '~utils/router'
import routes from '~config/routes'
import { useNotification } from '~hooks'

export function CreateOrEdit({ history, match }) {
  const { projectId, configurationId } = match.params
  const mode = configurationId ? 'edit' : 'create'

  const handleCancel = useCallback(() => {
    history.goBack()
  }, [])

  const notify = useNotification()

  const handleSubmit = useCallback(
    ({ values, errorMessage }) => {
      if (errorMessage) {
        notify.error(errorMessage)
      } else {
        notify.success(
          `Scenario ${configurationId ? 'updated' : 'created'} successfully`
        )
        history.push(getUrl(routes.projects.configurations.list, match.params))
      }
    },
    [configurationId]
  )

  return (
    <ConfigurationForm
      mode={mode}
      projectId={projectId}
      configurationId={configurationId}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  )
}

CreateOrEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      configurationId: PropTypes.string,
      projectId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default CreateOrEdit
