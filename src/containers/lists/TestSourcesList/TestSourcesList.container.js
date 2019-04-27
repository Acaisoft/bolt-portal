import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { Pagination } from '~containers'
import { ButtonWithIcon, SectionHeader } from '~components'
import { withListFilters } from '~hocs'

import TestSourcesList from './TestSourcesList.component'
import { GET_TEST_SOURCES } from './graphql'

export class TestSourcesListContainer extends Component {
  static propTypes = {
    listFilters: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    projectId: PropTypes.string,
    sourcesQuery: PropTypes.shape({
      testSources: PropTypes.array,
      pagination: PropTypes.object,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  render() {
    const {
      listFilters,
      onCreate,
      onDelete,
      onEdit,
      projectId,
      sourcesQuery: { testSources = [], pagination, loading },
    } = this.props

    const totalCount = (pagination && pagination.aggregate.count) || 0

    return (
      <React.Fragment>
        <SectionHeader
          title="Test Sources"
          subtitle={`(${totalCount})`}
          marginBottom
        >
          <Pagination
            {...listFilters.pagination}
            onChange={listFilters.setPagination}
            totalCount={totalCount}
          />
          <ButtonWithIcon
            icon={Add}
            color="secondary"
            variant="contained"
            onClick={onCreate}
          >
            New
          </ButtonWithIcon>
        </SectionHeader>
        <TestSourcesList
          loading={loading}
          testSources={testSources}
          projectId={projectId}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withListFilters({
    initialState: { pagination: { rowsPerPage: 10 }, orderBy: [{ id: 'asc' }] },
  }),
  graphql(GET_TEST_SOURCES, {
    name: 'sourcesQuery',
    options: ({ projectId, listFilters: { pagination, orderBy } }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        projectId,
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        order_by: orderBy,
      },
    }),
  })
)(TestSourcesListContainer)
