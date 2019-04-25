import React from 'react'
import classNames from 'classnames'

import { Loader } from '~components'
import { TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core'

function DefaultBodyRenderer({
  checkboxes,
  checkboxKey,
  classes,
  columns,
  data,
  handleSelect,
  isLoading,
  rowKey,
  selected,
  striped,
}) {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow className={classNames({ [classes.striped]: striped })}>
          <TableCell colSpan={columns.length}>
            <Loader loading fill />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow
          key={rowKey(row)}
          className={classNames({
            // Indices are zero-based, so we need to shift by one.
            [classes.stripedOdd]: striped && index % 2 === 0,
            [classes.stripedEven]: striped && index % 2 === 1,
          })}
        >
          {checkboxes && (
            <TableCell key="_checkbox" padding="checkbox">
              <Checkbox
                checked={selected && selected.has(checkboxKey(row))}
                onChange={handleSelect(checkboxKey(row))}
              />
            </TableCell>
          )}
          {columns.map(({ render, title, renderFooter, ...cellProps }) => (
            <TableCell {...cellProps}>{render(row)}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default DefaultBodyRenderer
