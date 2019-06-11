import React from 'react'
import {
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  Select,
} from '@material-ui/core'

function ChartFilter({ groupNames, selected, onChange }) {
  if (groupNames.length < 2) {
    return null
  }

  return (
    <FormControl>
      <Select
        multiple
        displayEmpty
        value={selected}
        onChange={onChange}
        renderValue={selected =>
          `${selected.length} line${selected.length !== 1 ? 's' : ''} selected`
        }
        MenuProps={{
          MenuListProps: {
            disablePadding: true,
          },
        }}
      >
        {groupNames.map(groupName => (
          <MenuItem key={groupName} value={groupName}>
            <Checkbox checked={selected.includes(groupName)} />
            <ListItemText primary={groupName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ChartFilter
