import React, { useCallback } from 'react'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { withRouter, matchPath } from 'react-router-dom'

import { Loader, Breadcrumbs } from '~components'

import routes from '~config/routes'

import {
  SUBSCRIBE_TO_PROJECTS,
  SUBSCRIBE_TO_SCENARIOS,
  SUBSCRIBE_TO_EXECUTIONS,
} from './graphql'
import { TextField, MenuItem } from '@material-ui/core'
import { getUrl } from '~utils/router'

function NavBreadcrumbs({ history, location }) {
  const { projectId, configurationId, executionId } = getRouteParams(
    location.pathname
  )

  const { data: { projects = [] } = {}, projectsLoading } = useSubscription(
    SUBSCRIBE_TO_PROJECTS,
    {
      fetchPolicy: 'cache-first',
    }
  )
  const {
    data: { configurations = [] } = {},
    configurationsLoading,
  } = useSubscription(SUBSCRIBE_TO_SCENARIOS, {
    fetchPolicy: 'cache-first',
    variables: { projectId },
    skip: !configurationId,
  })
  const { data: { executions = [] } = {}, executionsLoading } = useSubscription(
    SUBSCRIBE_TO_EXECUTIONS,
    {
      fetchPolicy: 'cache-first',
      variables: { configurationId },
      skip: !executionId,
    }
  )

  const handleChangeProject = useCallback(e => {
    history.push(getUrl(routes.projects.details, { projectId: e.target.value }))
  }, [])

  const handleChangeConfiguration = useCallback(
    e => {
      history.push(
        getUrl(routes.projects.configurations.details, {
          projectId,
          configurationId: e.target.value,
        })
      )
    },
    [projectId]
  )
  const handleChangeExecution = useCallback(
    e => {
      history.push(
        getUrl(routes.projects.configurations.executions.details, {
          projectId,
          configurationId,
          executionId: e.target.value,
        })
      )
    },
    [projectId, configurationId]
  )

  if (projectsLoading || configurationsLoading || executionsLoading) {
    return <Loader loading />
  }

  const breadcrumbs = [
    {
      key: 'projects',
      render: () => (
        <Selector
          label="Project"
          options={projects.map(item => ({
            value: item.id,
            label: item.name,
          }))}
          value={projectId || ''}
          onChange={handleChangeProject}
        />
      ),
    },
  ]

  if (configurationId) {
    breadcrumbs.push({
      key: 'configurations',
      render: () => (
        <Selector
          label="Scenario"
          options={configurations.map(item => ({
            value: item.id,
            label: item.name,
          }))}
          value={configurationId || ''}
          onChange={handleChangeConfiguration}
        />
      ),
    })
  }
  if (executionId) {
    breadcrumbs.push({
      key: 'executions',
      render: () => (
        <Selector
          label="Test Run"
          placeholder="Select a test run"
          options={executions.map(item => ({
            value: item.id,
            label: moment(item.start || item.start_locust).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
          }))}
          value={executionId || ''}
          onChange={handleChangeExecution}
        />
      ),
    })
  }

  return <Breadcrumbs items={breadcrumbs} />
}

function Selector({ options, value, ...fieldProps }) {
  return (
    <TextField
      select
      value={value}
      {...fieldProps}
      SelectProps={{
        // displayEmpty: true,
        autoWidth: true,
        disableUnderline: true,
        SelectDisplayProps: {
          style: { minWidth: 80 },
        },
      }}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

function getRouteParams(url) {
  const routesMatchingBreadcrumbs = [
    routes.projects.configurations.executions.details,
    routes.projects.configurations.details,
    routes.projects.details,
  ]

  for (let i = 0; i < routesMatchingBreadcrumbs.length; ++i) {
    const match = matchPath(url, {
      exact: false,
      path: routesMatchingBreadcrumbs[i],
    })

    if (match) {
      return match.params
    }
  }

  return {}
}

export default withRouter(NavBreadcrumbs)
