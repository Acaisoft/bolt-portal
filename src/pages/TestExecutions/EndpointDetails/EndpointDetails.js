import React, { useMemo } from 'react'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { SectionHeader, Loader, Breadcrumbs } from '~components'

import { GET_CONFIGURATION, GET_EXECUTION, GET_ENDPOINT } from './graphql'
import { getUrl } from '~utils/router'
import routes from '~config/routes'

function EndpointDetails({ classes, history, match }) {
  const { configurationId, executionId, endpointId } = match.params

  const { endpointTotals, endpointTotalsLoading } = useEndpointQuery(endpointId)
  const { execution, executionLoading } = useExecutionQuery(executionId)
  const { configuration, configurationLoading } = useConfigurationQuery(
    configurationId
  )

  const breadcrumbs = useBreadcrumbs({
    params: match.params,
    endpointTotals,
    execution,
    configuration,
  })

  if (endpointTotalsLoading || executionLoading || configurationLoading) {
    return <Loader loading />
  }

  return (
    <div>
      <SectionHeader title={<Breadcrumbs items={breadcrumbs} />} marginBottom />
    </div>
  )
}

function useBreadcrumbs({ params, configuration, execution, endpointTotals }) {
  const breadcrumbs = useMemo(() => {
    const executionStart = execution.start || execution.start_locust

    return [
      {
        url: getUrl(routes.projects.configurations.details, { ...params }),
        label: configuration.name || 'Scenario details',
      },
      {
        url: getUrl(routes.projects.configurations.executions.details, {
          ...params,
        }),
        label: executionStart
          ? moment(executionStart).format('YYYY-MM-DD')
          : 'Execution details',
      },
      {
        url: null,
        label: endpointTotals.method
          ? `${endpointTotals.method} ${endpointTotals.name}`
          : 'Request results',
      },
    ]
  }, [params, configuration, execution, endpointTotals])

  return breadcrumbs
}

function useEndpointQuery(endpointId) {
  const {
    loading,
    data: { endpointTotals = [] },
  } = useQuery(GET_ENDPOINT, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return { endpointTotalsLoading: loading, endpointTotals: endpointTotals[0] || {} }
}

function useExecutionQuery(executionId) {
  const {
    loading,
    data: { execution = {} },
  } = useQuery(GET_EXECUTION, {
    variables: { executionId },
    fetchPolicy: 'cache-first',
  })

  return { executionLoading: loading, execution }
}

function useConfigurationQuery(configurationId) {
  const {
    loading,
    data: { configuration = {} },
  } = useQuery(GET_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-first',
  })

  return { configurationLoading: loading, configuration }
}

export default EndpointDetails
