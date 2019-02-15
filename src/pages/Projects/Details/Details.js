import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { IconButton, Typography } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'

import DataTable from '~components/DataTable'
import styles from './Details.styles'

import faketestsData from '../testExecutionsData.mock'

export class Details extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string,
  }

  items = [
    {
      id: 1,
      label: 'TEST RUN CONFIGURATIONS',
      linkTo: `${this.props.match.url}/test-configurations`,
      description: 'Manage Test Run Configurations for My Super App.',
    },
    {
      id: 2,
      label: 'TEST REPOSITORIES',
      linkTo: `${this.props.match.url}/test-repositories`,
      description: 'Manage Test Repositories for My Super App.',
    },
    {
      id: 3,
      label: 'TESTS EXECUTIONS',
      linkTo: `${this.props.match.url}/test-execs`,
      description: 'See all tests executions results.',
    },
    {
      id: 4,
      label: 'USERS',
      linkTo: `${this.props.match.url}/users`,
      description: 'Manage Users for My Super App.',
    },
  ]

  render() {
    const { classes, match } = this.props
    const latestData = faketestsData.slice(0, 5)

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see manage settings for testing project
        </Typography>
        <Grid container spacing={24} className={classes.gridContainer}>
          {this.items.map(({ id, label, linkTo, description }) => (
            <Grid item xs={3} key={id}>
              <Card
                component={Link}
                to={linkTo}
                aria-label={label}
                className={classes.card}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {label}
                  </Typography>
                  <Typography variant="body2">{description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h3" gutterBottom>
          Last Tests Executions
        </Typography>
        <div className={classes.tableContainer}>
          <DataTable
            data={latestData}
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
        <div className={classes.linkContainer}>
          <Link to={`${match.url}/test-execs`} className={classes.link}>
            See All
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
