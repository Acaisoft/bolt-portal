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

  const {
    loading,
    data: { configuration },
  } = useQuery(GET_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-and-network',
  })

  const handleEdit = useCallback(() => {
    history.push(getUrl(routes.projects.configurations.edit, match.params))
  }, [match])

  const getTestDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.details, {
        ...match.params,
        executionId: execution.id,
      })
    },
    [match.params]
  )
  const getMonitoringDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.monitoring, {
        ...match.params,
        executionId: execution.id,
      })
    },
    [match.params]
  )

  const handleDelete = useCallback(
    error => {
      if (error) {
        toast.error(error)
      } else {
        toast.success('Configuration has been deleted.')
        history.push(getUrl(routes.projects.configurations.list, match.params))
      }
    },
    [match.params]
  )

  const handleRun = useCallback(error => {
    if (error) {
      toast.error(`Could not start: ${error}`)
    } else {
      toast.success('Configuration has been started.')
    }
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
          configurationId={configurationId}
          getTestDetailsUrl={getTestDetailsUrl}
          getMonitoringDetailsUrl={getMonitoringDetailsUrl}
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

export default withStyles(styles)(Details)
