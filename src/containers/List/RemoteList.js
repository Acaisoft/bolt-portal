import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import List from './List'

export class RemoteList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    query: PropTypes.object.isRequired,
    variables: PropTypes.object,
    paginationDataKey: PropTypes.string.isRequired,
    showPagination: PropTypes.bool,
  }

  static defaultProps = {
    showPagination: true,
    variables: {},
  }

  render() {
    const {
      children,
      paginationDataKey,
      showPagination,
      query,
      variables,
    } = this.props

    const queryVariables = {
      ...variables,
    }

    return (
      <Query query={query} variables={queryVariables}>
        {result => (
          <List
            data={result.data}
            onPaginationChange={pagination => {
              result.refetch({
                limit: pagination.rowsPerPage,
                offset: pagination.offset,
              })
            }}
            showPagination={showPagination}
            totalCount={
              result.data[paginationDataKey] &&
              result.data[paginationDataKey].aggregate.count
            }
          >
            {children(result)}
          </List>
        )}
      </Query>
    )
  }
}

export default RemoteList
