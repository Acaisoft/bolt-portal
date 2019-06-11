import React, { useCallback } from 'react'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { Link, withRouter, matchPath } from 'react-router-dom'
import { ExpandMore } from '@material-ui/icons'
import { Loader, Breadcrumbs } from '~components'

import routes from '~config/routes'

import useStyles from './NavBreadcrumbs.styles'

import _ from 'lodash'

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

  const { getConfigurationUrl, getExecutionUrl, getProjectUrl } = useUrlGetters({
    projectId,
    configurationId,
    executionId,
  })

  const {
    data: { projects, configurations, executions },
    loading,
  } = useSelectorsData({
    projectId,
    configurationId,
    executionId,
  })

  if (loading) {
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
            label: _.truncate(item.name, { length: 45, omission: '...' }),
          }))}
          generateUrl={getProjectUrl}
          value={projectId || ''}
        />
      ),
    },
  ]

  if (configurationId && configurations.find(item => item.id === configurationId)) {
    breadcrumbs.push({
      key: 'configurations',
      render: () => (
        <Selector
          label="Scenario"
          options={configurations.map(item => ({
            value: item.id,
            label: item.name,
          }))}
          generateUrl={getConfigurationUrl}
          value={configurationId || ''}
        />
      ),
    })
  }
  if (executionId && executions.find(item => item.id === executionId)) {
    breadcrumbs.push({
      key: 'executions',
      render: () => (
        <Selector
          label="Test Run"
          placeholder="Select a test run"
          options={executions.map(item => ({
            value: item.id,
            label: moment(item.start_locust || item.start).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
          }))}
          generateUrl={getExecutionUrl}
          value={executionId || ''}
        />
      ),
    })
  }

  return <Breadcrumbs items={breadcrumbs} />
}

function Selector({ options, value, generateUrl, ...fieldProps }) {
  const classes = useStyles()

  return (
    <TextField
      select
      value={value}
      {...fieldProps}
      variant="filled"
      SelectProps={{
        autoWidth: true,
        disableUnderline: true,
        SelectDisplayProps: {
          style: { minWidth: 80 },
        },
        IconComponent: ExpandMore,
      }}
    >
      {options.map(option => (
        <MenuItem
          key={option.value}
          to={generateUrl(option.value)}
          value={option.value}
          component={Link}
        >
          {option.label}
        </MenuItem>
      ))}

      {fieldProps.label === 'Project' && (
        <MenuItem
          className={classes.allItem}
          to={getUrl(routes.projects.list)}
          component={Link}
        >
          All Projects
        </MenuItem>
      )}
    </TextField>
  )
}

function getRouteParams(url) {
  const routesMatchingBreadcrumbs = [
    // Match more detailed routes first to prevent reading route parts as IDs
    // E.g. /configurations/create, where 'create' is treated as ID
    routes.projects.configurations.create,

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

function useSelectorsData({ projectId, configurationId, executionId }) {
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

  return {
    data: {
      projects,
      configurations,
      executions,
    },
    loading: projectsLoading || configurationsLoading || executionsLoading,
  }
}

function useUrlGetters({ projectId, configurationId, executionId }) {
  const getProjectUrl = useCallback(
    id => getUrl(routes.projects.details, { projectId: id }),
    []
  )
  const getConfigurationUrl = useCallback(
    id =>
      getUrl(routes.projects.configurations.details, {
        projectId,
        configurationId: id,
      }),
    [projectId]
  )
  const getExecutionUrl = useCallback(
    id =>
      getUrl(routes.projects.configurations.executions.details, {
        projectId,
        configurationId,
        executionId: id,
      }),
    [projectId, configurationId]
  )

  return { getProjectUrl, getConfigurationUrl, getExecutionUrl }
}

export default withRouter(NavBreadcrumbs)
