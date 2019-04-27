import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { ButtonWithIcon, SectionHeader } from '~components'
import { Pagination } from '~containers'
import { withListFilters } from '~hocs'

import { GET_TEST_CONFIGURATIONS } from './graphql'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    configsQuery: PropTypes.shape({
      configuration: PropTypes.array,
      pagination: PropTypes.object,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    listFilters: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
  }

  render() {
    const {
      configsQuery: { configurations = [], pagination, loading },
      listFilters,
      onCreate,
      onDetails,
      projectId,
    } = this.props

    const totalCount = pagination ? pagination.aggregate.count : 0

    return (
      <React.Fragment>
        <SectionHeader title="Scenarios" subtitle={`(${totalCount})`} marginBottom>
          <Pagination
            {...listFilters.pagination}
            onChange={listFilters.setPagination}
            totalCount={totalCount}
          />
          <ButtonWithIcon
            icon={Add}
            variant="contained"
            color="secondary"
            onClick={onCreate}
          >
            New
          </ButtonWithIcon>
        </SectionHeader>
        <TestConfigurationsList
          configurations={configurations}
          loading={loading}
          onDetails={onDetails}
          projectId={projectId}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  withListFilters({
    initialState: { pagination: { rowsPerPage: 10 }, orderBy: [{ id: 'asc' }] },
  }),
  graphql(GET_TEST_CONFIGURATIONS, {
    name: 'configsQuery',
    options: ({ projectId, listFilters: { pagination, orderBy } }) => ({
      variables: {
        projectId,
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        order_by: orderBy,
      },
      fetchPolicy: 'cache-and-network',
    }),
  })
)(TestConfigurationsListContainer)
