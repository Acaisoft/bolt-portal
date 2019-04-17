import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'
import { Pagination } from '~containers'
import { SectionHeader } from '~components'
import { withQueryPagination } from '~hocs'

import { GET_TEST_EXECUTIONS } from './graphql'
import TestExecutionsList from './TestExecutionsList.component'

export class TestExecutionsListContainer extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
    hideCounter: PropTypes.bool,
    limit: PropTypes.number,
    pagination: PropTypes.object.isRequired,
    showPagination: PropTypes.bool,
    executionsQuery: PropTypes.shape({
      execution: PropTypes.array,
      loading: PropTypes.bool,
    }).isRequired,
    title: PropTypes.node,
  }

  static defaultProps = {
    title: 'Test Runs',
  }

  render() {
    const {
      executionsQuery: { executions = [], loading },
      hideCounter,
      onDetails,
      pagination,
      projectId,
      showPagination,
      title,
    } = this.props

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
  }
}

export default compose(
  graphql(GET_TEST_EXECUTIONS, {
    name: 'executionsQuery',
    options: ({ configurationId, limit, projectId }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        projectId,
        configurationId,
        limit,
        order_by: [{ start: 'desc' }],
      },
    }),
  }),
  withQueryPagination({ queryProp: 'executionsQuery' })
)(TestExecutionsListContainer)
