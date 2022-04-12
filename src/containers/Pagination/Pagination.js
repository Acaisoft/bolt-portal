import React from 'react'
import PropTypes from 'prop-types'

import { TablePagination } from '@material-ui/core'

const offsetToPage = (offset, rowsPerPage) => parseInt(offset / rowsPerPage, 10)
const pageToOffset = (page, rowsPerPage) => page * rowsPerPage

function Pagination({
  offset = 0,
  onChange = () => {},
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25],
  totalCount,
}) {
  const page = offsetToPage(offset, rowsPerPage)

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPage={rowsPerPage}
      count={totalCount}
      page={page}
      onPageChange={(e, newPage) => {
        onChange({
          page: newPage,
          offset: pageToOffset(newPage, rowsPerPage),
          rowsPerPage,
        })
      }}
      onRowsPerPageChange={e => {
        onChange({
          page: 0,
          offset: 0,
          rowsPerPage: e.target.value,
        })
      }}
    />
  )
}
Pagination.propTypes = {
  onChange: PropTypes.func,
  offset: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
}

export default Pagination
