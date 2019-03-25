import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RemoteList } from '~containers'

import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

import RepositoriesList from './RepositoriesList.component'

export class RepositoriesListContainer extends Component {
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
      <RemoteList
        paginationDataKey="repository_aggregate"
        query={query}
        variables={variables}
        {...listProps}
      >
        {({ data, loading }) => (
          <RepositoriesList
            repositories={data && data.repository}
            loading={loading}
            projectId={projectId}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </RemoteList>
    )
  }
}

export default RepositoriesListContainer
