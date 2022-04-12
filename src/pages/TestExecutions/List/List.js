import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import routes from 'config/routes'
import { getUrl } from 'utils/router'

import { TestExecutionsList } from './components'

import useStyles from './List.styles'

export function List() {
  const params = useParams()
  const { projectId } = params

  const classes = useStyles()

  const getExecutionDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.details, {
        ...params,
        configurationId: execution.configuration.id,
        executionId: execution.id,
      })
    },
    [params]
  )

  return (
    <div className={classes.root}>
      <Typography variant="body2">
        Here you see results of all tests performed in all of your projects
      </Typography>
      <div className={classes.tableContainer}>
        <TestExecutionsList
          projectId={projectId}
          getExecutionDetailsUrl={getExecutionDetailsUrl}
        />
      </div>
    </div>
  )
}

export default List
