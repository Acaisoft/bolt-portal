import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import { withStyles } from '@material-ui/core'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { TestConfigurationsList } from './components'
import styles from './List.styles'

export function List({ classes, history, match }) {
  const { projectId } = match.params

  const { handleCreate, handleDetails, handleRun } = useHandlers(history, match)

  return (
    <div className={classes.root}>
      <TestConfigurationsList
        projectId={projectId}
        onCreate={handleCreate}
        onDetails={handleDetails}
        onRun={handleRun}
      />
    </div>
  )
}
List.propTypes = {
  classes: PropTypes.object.isRequired,
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

  const handleRun = useCallback(({ configuration, error }) => {
    if (error) {
      toast.error(error)
    } else {
      toast.success(`Scenario '${configuration.name}' was successfully started.`)
    }
  }, [])

  return { handleCreate, handleDetails, handleRun }
}

export default withStyles(styles)(List)
