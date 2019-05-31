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

  const { handleCreate, handleDetails } = useHandlers(history, match)

  return (
    <div className={classes.root}>
      <TestConfigurationsList
        projectId={projectId}
        onCreate={handleCreate}
        onDetails={handleDetails}
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
  const redirectToPage = useCallback(
    (path, params = {}) => {
      history.push(getUrl(path, { ...match.params, ...params }))
    },
    [history, match]
  )

  const handleCreate = useCallback(() => {
    redirectToPage(routes.projects.configurations.create)
  }, [])

  const handleDetails = useCallback(configuration => {
    redirectToPage(routes.projects.configurations.details, {
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

  return { handleCreate, handleDetails, handleRun }
}

export default List
