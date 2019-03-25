import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pagination } from '~containers'

export class List extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    onPaginationChange: PropTypes.func,
    limit: PropTypes.number,
    showPagination: PropTypes.bool,
    totalCount: PropTypes.number,
  }

  static defaultProps = {
    limit: 10,
    onPaginationChange: () => {},
    showPagination: true,
  }

  render() {
    const {
      children,
      limit,
      offset,
      onPaginationChange,
      showPagination,
      totalCount,
    } = this.props

    return (
      <React.Fragment>
        {children}
        {showPagination && totalCount ? (
          <Pagination
            limit={limit}
            offset={offset}
            onChange={onPaginationChange}
            totalCount={totalCount}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default List
