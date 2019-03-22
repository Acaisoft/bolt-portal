import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RepositoriesTable } from '~components'
import { List } from '~containers'
import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

export class RepositoriesList extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onDelete, onEdit, ...listProps } = this.props

    const query = GET_REPOSITORIES_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <List
        paginationDataKey="repository_aggregate"
        query={query}
        variables={variables}
        {...listProps}
      >
        {({ data, loading }) => (
          <RepositoriesTable
            repositories={data && data.repository}
            loading={loading}
            projectId={projectId}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </List>
    )
  }
}

export default RepositoriesList
