import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

import { TestExecutionsTable } from '~components'
import { Pagination } from '~containers'
import {
  GET_CONFIG_EXECUTIONS_QUERY,
  GET_EXECUTIONS_QUERY,
  GET_PROJECT_EXECUTIONS_QUERY,
} from '~services/GraphQL/Queries'

export class TestExecutionsList extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    limit: PropTypes.number,
    pagination: PropTypes.bool,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    limit: 10,
    pagination: true,
  }

  render() {
    const { configurationId, limit, pagination, projectId } = this.props

    const query = configurationId
      ? GET_CONFIG_EXECUTIONS_QUERY
      : projectId
      ? GET_PROJECT_EXECUTIONS_QUERY
      : GET_EXECUTIONS_QUERY

    const variables = {
      configurationId,
      projectId,
      limit,
      offset: 0,
      order_by: [{ start: 'desc' }],
    }

    return (
      <Query query={query} variables={variables}>
        {({ data, loading, error, refetch }) => (
          <React.Fragment>
            <TestExecutionsTable
              executions={data && data.execution}
              loading={loading}
              projectId={projectId}
              getDetailsUrl={execution => `/test-runs/${execution.id}`}
            />
            {pagination && data.execution_aggregate && (
              <Pagination
                onChange={pagination => {
                  refetch({
                    limit: pagination.limit,
                    offset: pagination.offset,
                  })
                }}
                totalCount={data.execution_aggregate.aggregate.count}
              />
            )}
          </React.Fragment>
        )}
      </Query>
    )
  }
}

export default TestExecutionsList
