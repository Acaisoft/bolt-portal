import React from 'react'
import { TableFooter, TableRow, TableCell } from '@material-ui/core'

function DefaultFooterRenderer({ classes, columns, data, isLoading }) {
  if (isLoading) {
    return null
  }

  return (
    <TableFooter>
      <TableRow className={classes.footer}>
        {columns.map(({ renderFooter, title, render, ...cellProps }) => (
          <TableCell {...cellProps}>
            {typeof renderFooter === 'function' ? renderFooter(data) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableFooter>
  )
}

export default DefaultFooterRenderer
