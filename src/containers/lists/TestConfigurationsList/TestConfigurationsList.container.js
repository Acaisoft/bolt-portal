import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pagination, RemoteList } from '~containers'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onDelete, onEdit } = this.props

    const query = GET_CONFIGS_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <RemoteList
        paginationDataKey="configuration_aggregate"
        query={query}
        variables={variables}
      >
        {({ data, loading, pagination }) => {
          return (
            <React.Fragment>
              <Pagination {...pagination} />
              <TestConfigurationsList
                configurations={(data && data.configuration) || []}
                loading={loading}
                onDelete={onDelete}
                onEdit={onEdit}
                projectId={projectId}
              />
            </React.Fragment>
          )
        }}
      </RemoteList>
    )
  }
}

export default TestConfigurationsListContainer
