import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'

import { Pagination } from '~containers'

export class List extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    paginationDataKey: PropTypes.string.isRequired,
    limit: PropTypes.number,
    pagination: PropTypes.bool,
  }

  static defaultProps = {
    limit: 10,
    pagination: true,
  }

  render() {
    const {
      children,
      paginationDataKey,
      limit,
      showPagination,
      query,
      variables,
    } = this.props

    const queryVariables = {
      limit,
      offset: 0,
      ...variables,
    }

    return (
      <Query query={query} variables={queryVariables}>
        {result => (
          <React.Fragment>
            {children(result)}
            {showPagination && result.data[paginationDataKey] && (
              <Pagination
                onChange={pagination => {
                  result.refetch({
                    limit: pagination.limit,
                    offset: pagination.offset,
                  })
                }}
                totalCount={result.data[paginationDataKey].aggregate.count}
              />
            )}
          </React.Fragment>
        )}
      </Query>
    )
  }
}

export default List
