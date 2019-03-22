import React from 'react'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export function AddButton({ onClick }) {
  return (
    <Fab color="primary" aria-label="Add" onClick={onClick}>
      <Add />
    </Fab>
  )
}

export default AddButton
