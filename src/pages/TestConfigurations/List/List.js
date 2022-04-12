import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getUrl } from 'utils/router'
import routes from 'config/routes'
import { TestConfigurationsList } from './components'
import { useNotification } from 'hooks'
import useStyles from './List.styles'

export function List() {
  const navigate = useNavigate()
  const params = useParams()
  const { projectId } = params
  const classes = useStyles()

  const {
    getTestConfigurationCreateUrl,
    getTestConfigurationDetailsUrl,
    getTestConfigurationEditUrl,
    handleClone,
  } = useHandlers(navigate, params)

  return (
    <div className={classes.root}>
      <TestConfigurationsList
        projectId={projectId}
        getTestConfigurationCreateUrl={getTestConfigurationCreateUrl}
        getTestConfigurationDetailsUrl={getTestConfigurationDetailsUrl}
        getTestConfigurationEditUrl={getTestConfigurationEditUrl}
        onClone={handleClone}
      />
    </div>
  )
}

function useHandlers(navigate, params) {
  const getRedirectUrl = useCallback(
    (path, callbackParams = {}) => {
      return getUrl(path, { ...params, ...callbackParams })
    },
    [params]
  )

  const getTestConfigurationCreateUrl = useCallback(() => {
    return getRedirectUrl(routes.projects.configurations.create)
  }, [getRedirectUrl])

  const getTestConfigurationDetailsUrl = useCallback(
    configuration => {
      return getRedirectUrl(routes.projects.configurations.details, {
        configurationId: configuration.id,
      })
    },
    [getRedirectUrl]
  )

  const getTestConfigurationEditUrl = useCallback(
    configuration => {
      return getRedirectUrl(routes.projects.configurations.edit, {
        configurationId: configuration.id,
      })
    },
    [getRedirectUrl]
  )

  const notify = useNotification()

  const handleClone = useCallback(
    (error, newConfigurationId) => {
      if (error) {
        notify.error(`Could not clone: ${error}`)
      } else {
        notify.success(`Scenario has been cloned.`)
        navigate(
          getRedirectUrl(routes.projects.configurations.edit, {
            configurationId: newConfigurationId,
          })
        )
      }
    },
    [notify, navigate, getRedirectUrl]
  )

  const handleRun = useCallback(
    ({ configuration, error }) => {
      if (error) {
        notify.error(error)
      } else {
        notify.success(`Scenario '${configuration.name}' was successfully started.`)
      }
    },
    [notify]
  )

  return {
    getTestConfigurationCreateUrl,
    getTestConfigurationDetailsUrl,
    handleRun,
    getTestConfigurationEditUrl,
    handleClone,
  }
}

export default List
