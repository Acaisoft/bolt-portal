import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core'

import { getSubpageUrl } from '~utils/router'

import { TestExecutionsList } from './components'
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
        label: 'TEST SOURCES',
        linkTo: getUrl('/test-sources'),
        description: 'Manage Test Sources',
      },
      {
        id: 2,
        label: 'TEST SCENARIOS',
        linkTo: getUrl('/test-configurations'),
        description: 'Manage Test Scenarios',
      },
      {
        id: 3,
        label: 'TESTS RUNS',
        linkTo: getUrl('/test-runs'),
        description: 'See all tests run results',
      },
    ]
  }

  redirectToSubpage = (path, params = {}) => {
    const { history, match } = this.props

    history.push(getSubpageUrl(match, path, params))
  }

  handleExecutionDetails = execution => {
    this.redirectToSubpage('/test-runs/:executionId', {
      executionId: execution.id,
    })
  }

  handleExecutionsListMore = () => {
    this.redirectToSubpage('/test-runs')
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params

    return (
      <div className={classes.root}>
        {/* <Typography variant="body2">
          Here you see manage settings for testing project
        </Typography> */}
        <Grid container spacing={24} className={classes.gridContainer}>
          {this.items.map(({ id, label, linkTo, description }) => (
            <Grid item xs={4} key={id}>
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
            onDetails={this.handleExecutionDetails}
            onListMore={this.handleExecutionsListMore}
            projectId={projectId}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
