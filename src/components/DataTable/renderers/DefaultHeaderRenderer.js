import React from 'react'
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core'

function DefaultHeaderRenderer({
  columns,
  checkboxes,
  data,
  handleSelectAll,
  multiselect,
  selected,
}) {
  return (
    <TableHead>
      <TableRow>
        {checkboxes && (
          <TableCell key="_checkbox" padding="checkbox">
            {multiselect && (
              <Checkbox
                indeterminate={Boolean(selected.size) && selected.size < data.length}
                checked={selected.size === data.length}
                onChange={handleSelectAll}
              />
            )}
          </TableCell>
        )}
        {columns.map(({ key, title, width }) => (
          <TableCell key={key} width={width}>
            {title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default DefaultHeaderRenderer
