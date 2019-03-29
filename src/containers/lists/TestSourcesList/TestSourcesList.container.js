import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pagination, RemoteList } from '~containers'

import { GET_TEST_SOURCES_QUERY } from '~services/GraphQL/Queries'

import TestSourcesList from './TestSourcesList.component'

export class TestSourcesListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onDelete, onEdit } = this.props

    const query = GET_TEST_SOURCES_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <RemoteList
        paginationDataKey="test_source_aggregate"
        query={query}
        variables={variables}
      >
        {({ data, loading, pagination }) => (
          <React.Fragment>
            <Pagination {...pagination} />
            <TestSourcesList
              repositories={data && data.test_source}
              loading={loading}
              projectId={projectId}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </React.Fragment>
        )}
      </RemoteList>
    )
  }
}

export default TestSourcesListContainer
