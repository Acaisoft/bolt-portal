import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core'

import { TestExecutionsList } from '~containers/lists'
import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  items = [
    {
      id: 1,
      label: 'TEST SCENARIOS',
      linkTo: `${this.props.match.url}/test-configurations`,
      description: 'Manage Test Scenarios for My Super App.',
    },
    {
      id: 2,
      label: 'TEST SOURCES',
      linkTo: `${this.props.match.url}/test-sources`,
      description: 'Manage Test Sources for My Super App.',
    },
    {
      id: 3,
      label: 'TESTS RUNS',
      linkTo: `${this.props.match.url}/test-runs`,
      description: 'See all tests run results.',
    },
    {
      id: 4,
      label: 'USERS',
      linkTo: `${this.props.match.url}/users`,
      description: 'Manage Users for My Super App.',
    },
  ]

  handleExecutionDetails = execution => {
    const { history, match } = this.props
    history.push(`${match.url}/test-runs/${execution.id}`)
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params

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
          <TestExecutionsList
            onDetails={this.handleExecutionDetails}
            projectId={projectId}
            pagination={false}
            limit={5}
          />
        </div>
        <div className={classes.linkContainer}>
          <Link to={`${match.url}/test-runs`} className={classes.link}>
            See All
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
