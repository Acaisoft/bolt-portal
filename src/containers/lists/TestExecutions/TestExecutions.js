import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TestExecutionsTable } from '~components'
import { List } from '~containers'
import {
  GET_CONFIG_EXECUTIONS_QUERY,
  GET_EXECUTIONS_QUERY,
  GET_PROJECT_EXECUTIONS_QUERY,
} from '~services/GraphQL/Queries'

export class TestExecutions extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    projectId: PropTypes.string,
  }

  render() {
    const { configurationId, projectId, ...listProps } = this.props

    const query = configurationId
      ? GET_CONFIG_EXECUTIONS_QUERY
      : projectId
      ? GET_PROJECT_EXECUTIONS_QUERY
      : GET_EXECUTIONS_QUERY

    const variables = {
      configurationId,
      projectId,
      order_by: [{ start: 'desc' }],
    }

    return (
      <List
        paginationDataKey="execution_aggregate"
        query={query}
        variables={variables}
        {...listProps}
      >
        {({ data, loading }) => (
          <TestExecutionsTable
            executions={data && data.execution}
            loading={loading}
            projectId={projectId}
            getDetailsUrl={execution => `/test-runs/${execution.id}`}
          />
        )}
      </List>
    )
  }
}

export default TestExecutions
