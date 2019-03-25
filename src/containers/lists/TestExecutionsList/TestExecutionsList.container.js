import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RemoteList } from '~containers'
import { GET_EXECUTIONS_QUERY } from '~services/GraphQL/Queries'

import TestExecutionsList from './TestExecutionsList.component'

export class TestExecutionsListContainer extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
  }

  render() {
    const { configurationId, onDetails, projectId, ...listProps } = this.props

    const query = GET_EXECUTIONS_QUERY

    const variables = {
      configurationId,
      projectId,
      order_by: [{ start: 'desc' }],
    }
    return (
      <RemoteList
        paginationDataKey="execution_aggregate"
        query={query}
        variables={variables}
        {...listProps}
      >
        {({ data, loading, error }) => {
          return (
            <TestExecutionsList
              executions={data && data.execution}
              loading={loading}
              projectId={projectId}
              onDetails={onDetails}
            />
          )
        }}
      </RemoteList>
    )
  }
}

export default TestExecutionsListContainer
