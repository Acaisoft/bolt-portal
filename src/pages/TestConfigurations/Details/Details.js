import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'

import { toast } from 'react-toastify'
import { withStyles } from '@material-ui/core'
import { Loader } from '~components'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import { ConfigurationInfo, TestExecutionsList } from './components'
import { GET_CONFIGURATION } from './graphql'
import styles from './Details.styles'

function Details({ classes, history, match }) {
  const { configurationId } = match.params

  const { getMonitoringDetailsUrl, getTestDetailsUrl } = useUrlGetters(match.params)
  const { handleEdit, handleDelete, handleRun } = useHandlers(history, match.params)

  const {
    loading,
    data: { configuration },
  } = useQuery(GET_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-and-network',
  })

  const breadcrumbs = useMemo(() => {
    return [
      {
        url: getUrl(routes.projects.configurations.list, { ...match.params }),
        label: 'Scenarios',
      },
      {
        url: null,
        label: configuration && configuration.name,
      },
    ]
  }, [configuration])

  if (loading) {
    return <Loader loading />
  }

  return (
    <div className={classes.root}>
      <ConfigurationInfo
        breadcrumbs={breadcrumbs}
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
          hasMonitoring={configuration.has_monitoring}
        />
      </div>
    </div>
  )
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
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

  return {
    getTestDetailsUrl,
    getMonitoringDetailsUrl,
  }
}

function useHandlers(history, params) {
  const handleEdit = useCallback(() => {
    history.push(getUrl(routes.projects.configurations.edit, params))
  }, [history, params])

  const handleDelete = useCallback(
    error => {
      if (error) {
        toast.error(error)
      } else {
        toast.success('Configuration has been deleted.')
        history.push(getUrl(routes.projects.configurations.list, params))
      }
    },
    [params]
  )

  const handleRun = useCallback(error => {
    if (error) {
      toast.error(`Could not start: ${error}`)
    } else {
      toast.success('Configuration has been started.')
    }
  })

  return { handleEdit, handleDelete, handleRun }
}

export default withStyles(styles)(Details)
