import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

import { toast } from 'react-toastify'
import { withStyles } from '@material-ui/core'
import { Loader } from '~components'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import { ConfigurationInfo, TestExecutionsList } from './components'
import styles from './Details.styles'

const GET_CONFIGURATION = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
      id
      name
      performed
      configuration_type {
        id
        name
      }
      configuration_parameters {
        id
        value
        parameter_slug
      }
      executions {
        id
        start
      }
      test_source {
        id
        source_type
        repository {
          id
          name
          url
        }
        test_creator {
          id
          name
        }
      }
    }
  }
`

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

  const handleExecutionDetails = useCallback(
    execution => {
      history.push(
        getUrl(routes.projects.configurations.executions.details, {
          ...match.params,
          executionId: execution.id,
        })
      )
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

  if (loading) {
    return <Loader loading />
  }

  return (
    <div className={classes.root}>
      <ConfigurationInfo
        configuration={configuration}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRun={handleRun}
        onExecutionDetails={handleExecutionDetails}
      />
      <div className={classes.tableContainer}>
        <TestExecutionsList
          configurationId={configurationId}
          onDetails={handleExecutionDetails}
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
