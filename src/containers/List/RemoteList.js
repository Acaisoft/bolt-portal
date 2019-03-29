import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

export class RemoteList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    paginationDataKey: PropTypes.string,
  }

  render() {
    const { children, paginationDataKey, ...queryProps } = this.props

    return (
      <Query {...queryProps}>
        {queryResult => {
          const paginationProps = {
            pagination: {
              onChange: pagination => {
                queryResult.refetch({
                  limit: pagination.rowsPerPage,
                  offset: pagination.offset,
                })
              },
              totalCount:
                (paginationDataKey &&
                  queryResult.data &&
                  queryResult.data[paginationDataKey] &&
                  queryResult.data[paginationDataKey].aggregate.count) ||
                0,
            },
          }

          return children({
            ...queryResult,
            ...paginationProps,
          })
        }}
      </Query>
    )
  }
}

export default RemoteList
