import React, { useCallback } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { ConfigurationForm } from './components'
import { getUrl } from 'utils/router'
import routes from 'config/routes'
import { useNotification } from 'hooks'

export function CreateOrEdit() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { configurationId } = params

  const urlParams = new URLSearchParams(location.search)
  const targetLocation = urlParams.get('from')

  const goToList = useCallback(() => {
    navigate(getUrl(routes.projects.configurations.list, { ...params }))
  }, [navigate, params])

  const goToDetails = useCallback(() => {
    navigate(getUrl(routes.projects.configurations.details, { ...params }))
  }, [navigate, params])

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

  return <ConfigurationForm onCancel={handleClose} onSubmit={handleSubmit} />
}

export default CreateOrEdit
