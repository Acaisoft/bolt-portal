import React from 'react'

import { IconButton, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'

import { DataTable } from '~components'

import styles from './TestExecutionResponsesList.component.styles'

export function TestExecutionResponsesList({
  classes,
  responses,
  loading,
  onDetails,
}) {
  return (
    <DataTable
      data={responses}
      isLoading={loading}
      rowKey={response => `${response.Method} ${response.Name}`}
    >
      <DataTable.Column
        key="type"
        render={response => response.Method}
        title="Type"
      />
      <DataTable.Column key="name" render={response => response.Name} title="Name" />
      <DataTable.Column
        key="total"
        render={response => +response['# requests'] + +response['# failures']}
        title="Total"
      />
      <DataTable.Column
        key="success"
        render={response => response['# requests']}
        title="Success"
      />
      <DataTable.Column
        key="fail"
        render={response => response['# failures']}
        title="Fail"
      />
      <DataTable.Column
        key="avg_response_time"
        render={response => response['Average response time']}
        title="Avg. Response Time"
      />
      <DataTable.Column
        key="avg_response_size"
        render={response => response['Average Content Size']}
        title="Avg. Response Size"
      />
      <DataTable.Column
        key="requests_per_sec"
        render={response => response['Requests/s']}
        title="Req/s"
      />
      <DataTable.Column
        key="actions"
        render={response => (
          <div className={classes.iconsContainer}>
            {+response['# failures'] > 0 && (
              <IconButton
                aria-label="Show fails"
                className={classes.icon}
                onClick={() => onDetails(response)}
              >
                <Pageview />
              </IconButton>
            )}
          </div>
        )}
        title="Fails"
      />
    </DataTable>
  )
}

export default withStyles(styles)(TestExecutionResponsesList)
