import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TestConfigurationsTable } from '~components'
import { List } from '~containers'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class TestConfigurations extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onDelete: PropTypes.func,
  }

  render() {
    const { projectId, onDelete, ...listProps } = this.props

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
            getDetailsUrl={configuration =>
              `/test-configurations/${configuration.id}`
            }
            loading={loading}
            onDelete={onDelete}
            projectId={projectId}
          />
        )}
      </List>
    )
  }
}

export default TestConfigurations
