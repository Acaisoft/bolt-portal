import React from 'react'
import moment from 'moment'

import { IconButton, withStyles } from '@material-ui/core'
import { History, Pageview } from '@material-ui/icons'

import { DataTable } from '~components'

import styles from './TestConfigurationsList.component.styles'

export function TestConfigurationsList({
  classes,
  configurations,
  loading,
  onDetails,
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
        key="type"
        render={configuration => configuration.configuration_type.name}
        title="Type"
      />
      <DataTable.Column
        key="source"
        render={configuration =>
          configuration.test_source &&
          configuration.test_source[configuration.test_source.source_type].name
        }
        title="Source"
      />
      <DataTable.Column
        key="lastRun"
        render={configuration => (
          <div className={classes.dateContainer}>
            {(configuration.executions[0] || {}).start && (
              <React.Fragment>
                <IconButton className={classes.icon} disabled>
                  <History />
                </IconButton>
                <span>
                  {moment(configuration.executions[0].start).format('YYYY-MM-DD')}
                </span>
              </React.Fragment>
            )}
          </div>
        )}
        title="Last Run"
      />
      <DataTable.Column
        key="actions"
        render={configuration => {
          return (
            <div className={classes.iconsContainer}>
              <IconButton
                aria-label="Show configuration details"
                className={classes.icon}
                onClick={() => onDetails(configuration)}
              >
                <Pageview />
              </IconButton>
            </div>
          )
        }}
        title="Actions"
      />
    </DataTable>
  )
}

export default withStyles(styles)(TestConfigurationsList)
