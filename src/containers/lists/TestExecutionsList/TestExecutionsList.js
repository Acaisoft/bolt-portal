import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TestExecutionsTable } from '~components'
import { List } from '~containers'
import { GET_EXECUTIONS_QUERY } from '~services/GraphQL/Queries'

export class TestExecutionsList extends Component {
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
            onDetails={onDetails}
          />
        )}
      </List>
    )
  }
}

export default TestExecutionsList
