import React from 'react'

import { IconButton, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { DataTable } from '~components'

import styles from './RepositoriesTable.styles'

export function RepositoriesTable({
  classes,
  repositories,
  loading,
  onDelete,
  onEdit,
}) {
  return (
    <DataTable
      data={repositories}
      isLoading={loading}
      rowKey={repository => repository.id}
    >
      <DataTable.Column
        key="name"
        render={repository => repository.name}
        title="Name"
      />
      <DataTable.Column
        key="source_type"
        render={repository => 'Repository'}
        title="Source Type"
      />
      <DataTable.Column
        key="configuration_type"
        render={repository => repository.configuration_type.name}
        title="Test Type"
      />
      <DataTable.Column
        key="scenarios"
        render={repository => repository.configurations.map(c => c.name).join(', ')}
        title="Scenarios"
      />
      <DataTable.Column
        key="actions"
        render={repository => (
          <div className={classes.iconsContainer}>
            <IconButton
              aria-label="Edit repository"
              className={classes.icon}
              onClick={() => onEdit(repository)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="Delete repository"
              className={classes.icon}
              onClick={() => onDelete(repository)}
            >
              <Delete />
            </IconButton>
          </div>
        )}
        title="Actions"
      />
    </DataTable>
  )
}

export default withStyles(styles)(RepositoriesTable)
