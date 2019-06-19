import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'

import { Box } from '@material-ui/core'
import {
  NotFoundPlaceholder,
  LoadingPlaceholder,
  ErrorPlaceholder,
} from '~components'
import { useNotification } from '~hooks'
import routes from '~config/routes'
import { getUrl } from '~utils/router'

import { ConfigurationInfo, TestExecutionsList } from './components'
import { GET_CONFIGURATION } from './graphql'
import useStyles from './Details.styles'

function Details({ history, match }) {
  const { configurationId } = match.params
  const classes = useStyles()

  const { getMonitoringDetailsUrl, getTestDetailsUrl, getDebugUrl } = useUrlGetters(
    match.params
  )
  const { handleEdit, handleDelete, handleRun, handleTerminate } = useHandlers(
    history,
    match.params
  )

  const {
    loading,
    data: { configuration },
    error,
  } = useQuery(GET_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-and-network',
  })

  if (loading || error || !configuration) {
    return (
      <Box p={3}>
        {loading ? (
          <LoadingPlaceholder title="Loading scenario..." />
        ) : error ? (
          <ErrorPlaceholder error={error} />
        ) : (
          <NotFoundPlaceholder title="Scenario not found" />
        )}
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <ConfigurationInfo
        configuration={configuration}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRun={handleRun}
      />
      <div className={classes.tableContainer}>
        <TestExecutionsList
          configuration={configuration}
          getTestDetailsUrl={getTestDetailsUrl}
          getMonitoringDetailsUrl={getMonitoringDetailsUrl}
          getDebugUrl={getDebugUrl}
          onTerminate={handleTerminate}
          hasMonitoring={configuration.has_monitoring}
        />
      </div>
    </div>
  )
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      configurationId: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

function useUrlGetters(params) {
  const getTestDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.details, {
        ...params,
        executionId: execution.id,
      })
    },
    [params]
  )
  const getMonitoringDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.monitoring, {
        ...params,
        executionId: execution.id,
      })
    },
    [params]
  )
  const getDebugUrl = useCallback(execution => {
    return getUrl(routes.argo.workflows.details, {
      argo_name: execution.argo_name,
    })
  }, [])

  return {
    getTestDetailsUrl,
    getMonitoringDetailsUrl,
    getDebugUrl,
  }
}

function useHandlers(history, params) {
  const handleEdit = useCallback(() => {
    history.push(getUrl(routes.projects.configurations.edit, params))
  }, [history, params])

  const notify = useNotification()

  const handleDelete = useCallback(
    error => {
      if (error) {
        notify.error(error)
      } else {
        notify.success('Configuration has been deleted.')
        history.push(getUrl(routes.projects.configurations.list, params))
      }
    },
    [history, notify, params]
  )

  const handleRun = useCallback(
    error => {
      if (error) {
        notify.error(`Could not start: ${error}`)
      } else {
        notify.success('Configuration has been started.')
      }
    },
    [notify]
  )

  const handleTerminate = useCallback(
    ({ error, ok }) => {
      if (!ok) {
        notify.error(`Could not terminate: ${error}`)
      } else {
        notify.success(`Test run has been terminated.`)
      }
    },
    [notify]
  )

  return { handleEdit, handleDelete, handleRun, handleTerminate }
}

export default Details
