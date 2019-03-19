import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

import { TestExecutionsTable } from '~components'
import {
  GET_CONFIG_EXECUTIONS_QUERY,
  GET_EXECUTIONS_QUERY,
  GET_PROJECT_EXECUTIONS_QUERY,
} from '~services/GraphQL/Queries'

export class TestExecutionsList extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    projectId: PropTypes.string,
  }

  render() {
    const { configurationId, projectId } = this.props

    const query = configurationId
      ? GET_CONFIG_EXECUTIONS_QUERY
      : projectId
      ? GET_PROJECT_EXECUTIONS_QUERY
      : GET_EXECUTIONS_QUERY

    return (
      <Query
        query={query}
        variables={{
          configurationId,
          projectId,
          limit: 10,
          offset: 0,
          order_by: [{ start: 'desc' }],
        }}
      >
        {({ data, loading, error }) => (
          <TestExecutionsTable
            executions={data && data.execution}
            loading={loading}
            projectId={projectId}
            getDetailsUrl={execution => `/test-runs/${execution.id}`}
          />
        )}
      </Query>
    )
  }
}

export default TestExecutionsList
