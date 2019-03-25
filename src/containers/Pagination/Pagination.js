import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TablePagination } from '@material-ui/core'

export class Pagination extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    totalCount: PropTypes.number,
  }

  static defaultProps = {
    onChange: () => {},
  }

  constructor(props) {
    super(props)

    const rowsPerPage = props.rowsPerPage || 10
    const page = props.offset ? props.offset / rowsPerPage : 0

    this.state = {
      page,
      rowsPerPage,
    }
  }

  componentDidUpdate(_, prevState) {
    const { page, rowsPerPage } = this.state

    if (prevState.page !== page || prevState.rowsPerPage !== rowsPerPage) {
      const calculated = {
        offset: page * rowsPerPage,
        page,
        rowsPerPage,
      }
      this.props.onChange(calculated)
    }
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = e => {
    this.setState({ page: 0, rowsPerPage: e.target.value })
  }

  render() {
    const { totalCount } = this.props
    const { page, rowsPerPage } = this.state

    return (
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        count={totalCount}
        page={page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    )
  }
}

export default Pagination
