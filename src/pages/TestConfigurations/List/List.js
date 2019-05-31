import React, { useCallback } from 'react'
import PropTypes from 'prop-types'


import { getUrl } from '~utils/router'
import routes from '~config/routes'
import { TestConfigurationsList } from './components'
import useStyles from './List.styles'
import { useNotification } from '~hooks'

export function List({ history, match }) {
  const { projectId } = match.params
  const classes = useStyles()

  const {
    getTestConfigurationCreateUrl,
    getTestConfigurationDetailsUrl,
  } = useHandlers(history, match)

  return (
    <div className={classes.root}>
      <TestConfigurationsList
        projectId={projectId}
        onCreate={getTestConfigurationCreateUrl}
        onDetails={getTestConfigurationDetailsUrl}
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
  const getRedirectUrl = useCallback(
    (path, params = {}) => {
      return getUrl(path, { ...match.params, ...params })
    },
    [history, match]
  )

  const getTestConfigurationCreateUrl = useCallback(() => {
    return getRedirectUrl(routes.projects.configurations.create)
  }, [])

  const getTestConfigurationDetailsUrl = useCallback(configuration => {
    return getRedirectUrl(routes.projects.configurations.details, {
      configurationId: configuration.id,
    })
  }, [])

  const notify = useNotification()

  const handleRun = useCallback(({ configuration, error }) => {
    if (error) {
      notify.error(error)
    } else {
      notify.success(`Scenario '${configuration.name}' was successfully started.`)
    }
  }, [])

  return { getTestConfigurationCreateUrl, getTestConfigurationDetailsUrl, handleRun }
}

export default List
