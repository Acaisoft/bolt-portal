import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core'

import { TestExecutionsList } from '~containers/lists'

import { getSubpageUrl } from '~utils/router'

import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    const getUrl = relativePath => getSubpageUrl(props.match, relativePath, {})

    this.items = [
      {
        id: 1,
        label: 'TEST SCENARIOS',
        linkTo: getUrl('/test-configurations'),
        description: 'Manage Test Scenarios for My Super App.',
      },
      {
        id: 2,
        label: 'TEST SOURCES',
        linkTo: getUrl('/test-sources'),
        description: 'Manage Test Sources for My Super App.',
      },
      {
        id: 3,
        label: 'TESTS RUNS',
        linkTo: getUrl('/test-runs'),
        description: 'See all tests run results.',
      },
      {
        id: 4,
        label: 'USERS',
        linkTo: getUrl('/users'),
        description: 'Manage Users for My Super App.',
      },
    ]
  }

  handleExecutionDetails = execution => {
    const { history, match } = this.props

    history.push(
      getSubpageUrl(match, '/test-runs/:executionId', {
        executionId: execution.id,
      })
    )
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
        <div className={classes.tableContainer}>
          <TestExecutionsList
            title={
              <Link to={`${match.url}/test-runs`} className={classes.link}>
                Latest Test Runs
              </Link>
            }
            onDetails={this.handleExecutionDetails}
            projectId={projectId}
            hideCounter
            limit={5}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
