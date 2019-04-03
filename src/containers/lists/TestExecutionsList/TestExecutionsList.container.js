import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pagination, RemoteList } from '~containers'
import { SectionHeader } from '~components'

import { GET_EXECUTIONS_QUERY } from '~services/GraphQL/Queries'

import TestExecutionsList from './TestExecutionsList.component'

export class TestExecutionsListContainer extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
    hideCounter: PropTypes.bool,
    showPagination: PropTypes.bool,
    title: PropTypes.node,
  }

  static defaultProps = {
    title: 'Test Runs',
  }

  render() {
    const {
      configurationId,
      hideCounter,
      limit,
      onDetails,
      projectId,
      showPagination,
      title,
    } = this.props

    const query = GET_EXECUTIONS_QUERY

    const variables = {
      configurationId,
      projectId,
      limit,
      order_by: [{ start: 'desc' }],
    }
    return (
      <RemoteList
        paginationDataKey="execution_aggregate"
        query={query}
        variables={variables}
        limit={limit}
      >
        {({ data, loading, pagination }) => {
          const executions = (data && data.execution) || []

          return (
            <React.Fragment>
              <SectionHeader
                title={title}
                subtitle={!hideCounter && `(${pagination.totalCount})`}
                marginBottom
              >
                {showPagination && <Pagination {...pagination} />}
              </SectionHeader>
              <TestExecutionsList
                executions={executions}
                loading={loading}
                projectId={projectId}
                onDetails={onDetails}
              />
            </React.Fragment>
          )
        }}
      </RemoteList>
    )
  }
}

export default TestExecutionsListContainer
