import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

import { TestExecutionsTable } from '~components'
import {
  GET_EXECUTIONS_QUERY,
  GET_PROJECT_EXECUTIONS_QUERY,
} from '~services/GraphQL/Queries'

export class TestExecutionsList extends Component {
  static propTypes = {
    getDetailsUrl: PropTypes.func.isRequired,
    projectId: PropTypes.string,
  }

  render() {
    const { getDetailsUrl, projectId } = this.props

    return (
      <Query
        query={projectId ? GET_PROJECT_EXECUTIONS_QUERY : GET_EXECUTIONS_QUERY}
        variables={{
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
            getDetailsUrl={getDetailsUrl}
          />
        )}
      </Query>
    )
  }
}

export default TestExecutionsList
