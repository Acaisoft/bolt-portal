import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import { TestExecutionsList } from './components'

import useStyles from './List.styles'

export function List({ history, match }) {
  const { projectId } = match.params

  const classes = useStyles()

  const getExecutionDetailsUrl = useCallback(
    execution => {
      return getUrl(routes.projects.configurations.executions.details, {
        ...match.params,
        configurationId: execution.configuration.id,
        executionId: execution.id,
      })
    },
    [match]
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
List.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default List
