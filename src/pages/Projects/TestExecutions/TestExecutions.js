import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'

import { DataTable } from '~components'
import styles from './TestExecutions.styles'

import faketestsData from '../testExecutionsData.mock'

export class TestExecutions extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
        <div className={classes.tableContainer}>
          <DataTable
            data={faketestsData}
            // isLoading={loading} TODO: Add loading with graphQL
            rowKey={test => test.id}
          >
            <DataTable.Column
              key="runDate"
              render={test => test.runDate}
              title="Run Date"
            />
            <DataTable.Column
              key="status"
              render={test => test.status}
              title="Status"
            />
            <DataTable.Column key="type" render={test => test.type} title="Type" />
            <DataTable.Column
              key="config"
              render={test => test.config}
              title="Configuration"
            />
            <DataTable.Column
              key="total"
              render={test => test.total}
              title="Total"
            />
            <DataTable.Column
              key="passed"
              render={test => test.passed}
              title="passed"
            />
            <DataTable.Column
              key="fails"
              render={test => test.fails}
              title="Fails"
            />
            <DataTable.Column
              key="skipped"
              render={test => test.skipped}
              title="Skipped"
            />
            <DataTable.Column
              key="actions"
              render={profile => (
                <div>
                  <IconButton
                    aria-label="Show details"
                    component={Link}
                    disabled
                    to={`/profiles/details/${profile.id}`}
                  >
                    <Pageview />
                  </IconButton>
                </div>
              )}
              title="Actions"
            />
          </DataTable>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TestExecutions)
