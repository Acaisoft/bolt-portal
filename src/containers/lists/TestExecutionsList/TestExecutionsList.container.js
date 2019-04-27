import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'
import { Pagination } from '~containers'
import { SectionHeader } from '~components'
import { withListFilters } from '~hocs'

import { GET_TEST_EXECUTIONS } from './graphql'
import TestExecutionsList from './TestExecutionsList.component'

export class TestExecutionsListContainer extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
    hideCounter: PropTypes.bool,
    limit: PropTypes.number,
    listFilters: PropTypes.object.isRequired,
    showPagination: PropTypes.bool,
    executionsQuery: PropTypes.shape({
      execution: PropTypes.array,
      pagination: PropTypes.object,
      loading: PropTypes.bool,
    }).isRequired,
    title: PropTypes.node,
  }

  static defaultProps = {
    title: 'Test Runs',
  }

  render() {
    const {
      executionsQuery: { executions = [], pagination, loading },
      hideCounter,
      onDetails,
      listFilters,
      projectId,
      showPagination,
      title,
    } = this.props

    const totalCount = (pagination && pagination.aggregate.count) || 0

    return (
      <React.Fragment>
        <SectionHeader
          title={title}
          subtitle={!hideCounter && `(${totalCount})`}
          marginBottom
        >
          {showPagination && (
            <Pagination
              {...listFilters.pagination}
              onChange={listFilters.setPagination}
              totalCount={totalCount}
            />
          )}
        </SectionHeader>
        <TestExecutionsList
          executions={executions}
          loading={loading}
          projectId={projectId}
          onDetails={onDetails}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withListFilters({
    initialState: ({ rowsPerPage }) => ({
      pagination: { rowsPerPage },
      orderBy: [{ start: 'desc' }],
    }),
  }),
  graphql(GET_TEST_EXECUTIONS, {
    name: 'executionsQuery',
    options: ({
      configurationId,
      projectId,
      listFilters: { pagination, orderBy },
    }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        projectId,
        configurationId,
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        order_by: orderBy,
      },
    }),
  })
)(TestExecutionsListContainer)
