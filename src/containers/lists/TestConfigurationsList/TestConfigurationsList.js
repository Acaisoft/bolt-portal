import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TestConfigurationsTable } from '~components'
import { List } from '~containers'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class TestConfigurationsList extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onDelete, onEdit, ...listProps } = this.props

    const query = GET_CONFIGS_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <List
        paginationDataKey="configuration_aggregate"
        query={query}
        variables={variables}
        {...listProps}
      >
        {({ data, loading }) => (
          <TestConfigurationsTable
            configurations={data && data.configuration}
            loading={loading}
            onDelete={onDelete}
            onEdit={onEdit}
            projectId={projectId}
          />
        )}
      </List>
    )
  }
}

export default TestConfigurationsList
