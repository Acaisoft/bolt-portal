import React from 'react'

import { IconButton, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { DataTable } from '~components'

import { TestSourceType } from '~config/constants'
import styles from './TestSourcesList.component.styles'

export function TestSourcesList({
  classes,
  testSources,
  loading,
  onDelete,
  onEdit,
}) {
  return (
    <DataTable data={testSources} isLoading={loading} rowKey={source => source.id}>
      <DataTable.Column
        key="name"
        render={source => (source[source.source_type] || {}).name}
        title="Name"
      />
      {/* <DataTable.Column
        key="configuration_type"
        render={source => source.configuration_type.name}
        title="Test Type"
      /> */}
      <DataTable.Column
        key="source_type"
        render={source => source.source_type}
        title="Source"
      />
      <DataTable.Column
        key="scenarios"
        render={source => source.configurations.map(c => c.name).join(', ')}
        title="Scenarios"
      />
      <DataTable.Column
        key="url"
        render={source =>
          source.source_type === TestSourceType.REPOSITORY
            ? source.repository.url
            : null
        }
        title="URL"
      />
      <DataTable.Column
        key="actions"
        render={source => (
          <div className={classes.iconsContainer}>
            <IconButton
              aria-label="Edit source"
              className={classes.icon}
              onClick={() => onEdit(source)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="Delete source"
              className={classes.icon}
              onClick={() => onDelete(source)}
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

export default withStyles(styles)(TestSourcesList)
