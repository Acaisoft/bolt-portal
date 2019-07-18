import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ConfigurationForm } from './components'
import { getUrl } from '~utils/router'
import routes from '~config/routes'
import { useNotification } from '~hooks'

export function CreateOrEdit({ history, match, location }) {
  const { projectId, configurationId } = match.params
  const mode = configurationId ? 'edit' : 'create'

  const urlParams = new URLSearchParams(location.search)
  const targetLocation = urlParams.get('from')

  const goToList = useCallback(() => {
    history.push(getUrl(routes.projects.configurations.list, { ...match.params }))
  }, [history, match.params])

  const goToDetails = useCallback(() => {
    history.push(getUrl(routes.projects.configurations.details, { ...match.params }))
  }, [history, match.params])

  const handleClose = useCallback(() => {
    if (targetLocation === 'list' || !configurationId) {
      goToList()
    } else {
      goToDetails()
    }
  }, [configurationId, goToDetails, goToList, targetLocation])

  const notify = useNotification()

  const handleSubmit = useCallback(
    ({ values, errorMessage }) => {
      if (errorMessage) {
        notify.error(errorMessage)
      } else {
        notify.success(
          `Scenario ${configurationId ? 'updated' : 'created'} successfully`
        )
        handleClose()
      }
    },
    [configurationId, notify, handleClose]
  )

  return (
    <ConfigurationForm
      mode={mode}
      projectId={projectId}
      configurationId={configurationId}
      onCancel={handleClose}
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
