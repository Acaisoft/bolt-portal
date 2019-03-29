import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

export class RemoteList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    query: PropTypes.object.isRequired,
    variables: PropTypes.object,
    paginationDataKey: PropTypes.string.isRequired,
  }

  render() {
    const { children, paginationDataKey, query, variables } = this.props

    return (
      <Query query={query} variables={variables}>
        {queryProps => {
          const paginationProps = {
            pagination: {
              onChange: pagination => {
                queryProps.refetch({
                  limit: pagination.rowsPerPage,
                  offset: pagination.offset,
                })
              },
              totalCount:
                (queryProps.data &&
                  queryProps.data[paginationDataKey] &&
                  queryProps.data[paginationDataKey].aggregate.count) ||
                0,
            },
          }

          return children({
            ...queryProps,
            ...paginationProps,
          })
        }}
      </Query>
    )
  }
}

export default RemoteList
