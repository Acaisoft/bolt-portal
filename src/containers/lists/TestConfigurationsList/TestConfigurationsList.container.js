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
      configuration_aggregate: PropTypes.shape({
        aggregate: PropTypes.shape({
          count: PropTypes.number,
        }),
      }),
      loading: PropTypes.bool,
    }).isRequired,
    listFilters: PropTypes.shape({
      setPagination: PropTypes.func.isRequired,
    }).isRequired,
    onCreate: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    projectId: PropTypes.string,
  }

  render() {
    const {
      configsQuery: { configurations = [], configuration_aggregate, loading },
      listFilters,
      projectId,
      onCreate,
      onDetails,
    } = this.props

    const totalCount = configuration_aggregate
      ? configuration_aggregate.aggregate.count
      : 0

    return (
      <React.Fragment>
        <SectionHeader title="Scenarios" subtitle={`(${totalCount})`} marginBottom>
          <Pagination totalCount={totalCount} onChange={listFilters.setPagination} />
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
  withListFilters({ initialState: props => ({ rowsPerPage: 10 }) }),
  graphql(GET_TEST_CONFIGURATIONS, {
    name: 'configsQuery',
    options: ({ projectId, listFilters }) => ({
      variables: {
        projectId,
        limit: listFilters.rowsPerPage,
        offset: listFilters.offset,
        order_by: [{ id: 'asc' }],
      },
      fetchPolicy: 'cache-and-network',
    }),
  })
)(TestConfigurationsListContainer)
