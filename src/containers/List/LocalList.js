import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List from './List'

const getVisibleData = (data, { limit = 10, offset = 0, orderBy = {} } = {}) => {
  return data.slice(offset, offset + limit)
}

export class LocalList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    data: PropTypes.array.isRequired,
    showPagination: PropTypes.bool,
  }

  static defaultProps = {
    showPagination: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      orderBy: [{ Name: 'desc' }],
    }
  }

  handlePaginationChange = pagination => {
    this.setState({
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
    })
  }

  render() {
    const { children, data, showPagination } = this.props
    const { limit, offset, orderBy } = this.state

    const visibleData = getVisibleData(data, { limit, offset, orderBy })

    return (
      <List
        onPaginationChange={this.handlePaginationChange}
        showPagination={showPagination}
        totalCount={data.length}
      >
        {children({ data: visibleData, loading: false })}
      </List>
    )
  }
}

export default LocalList
