import React from 'react'
import moment from 'moment'

import { IconButton, withStyles } from '@material-ui/core'
import { Edit, Delete, History, PlayArrow } from '@material-ui/icons'

import { DataTable } from '~components'

import styles from './TestConfigurationsList.component.styles'

export function TestConfigurationsList({
  classes,
  configurations,
  loading,
  onDelete,
  onEdit,
  projectId,
}) {
  return (
    <DataTable
      data={configurations}
      isLoading={loading}
      rowKey={configuration => configuration.id}
    >
      <DataTable.Column
        key="name"
        render={configuration => configuration.name}
        title="Name"
      />
      <DataTable.Column
        key="source"
        render={configuration => (configuration.repository || {}).url}
        title="Source"
      />
      <DataTable.Column
        key="lastRun"
        render={configuration => (
          <div className={classes.dateContainer}>
            {configuration.executions[0] && (
              <React.Fragment>
                <span>
                  {moment(configuration.executions[0].start).format('YYYY-MM-DD')}
                </span>
                <IconButton
                  aria-label="Delete repository"
                  className={classes.icon}
                  disabled
                >
                  <History />
                </IconButton>
              </React.Fragment>
            )}
          </div>
        )}
        title="Last Run"
      />
      <DataTable.Column
        key="actions"
        render={configuration => (
          <div className={classes.iconsContainer}>
            <IconButton
              aria-label="Start execution"
              className={classes.icon}
              disabled
            >
              <PlayArrow />
            </IconButton>
            <IconButton
              aria-label="Edit configuration"
              className={classes.icon}
              onClick={() => onEdit(configuration)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="Delete configuration"
              className={classes.icon}
              onClick={() => onDelete(configuration)}
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

export default withStyles(styles)(TestConfigurationsList)
