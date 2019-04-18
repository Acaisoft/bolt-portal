import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import moment from 'moment'

import { generatePath, Link as RouterLink } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Typography, withStyles, Paper, Grid, Link } from '@material-ui/core'

import { Loader, SectionHeader } from '~components'
import {
  TestExecutionRequestsChart,
  TestExecutionResponseTimeChart,
} from '~containers/charts'
import { TestExecutionResponsesList } from '~containers/lists'
import { ChevronRight } from '@material-ui/icons'

import {
  GET_EXECUTION_RESULTS_PER_TICK_QUERY,
  GET_EXECUTION_RESULTS_DISTRIBUTION_QUERY,
} from '~services/GraphQL/Queries'

import styles from './Details.styles'

const GET_EXECUTION_QUERY = gql`
  query getExecution($executionId: uuid!) {
    execution_by_pk(id: $executionId) {
      id
      start_locust
      configuration {
        id
        name
      }
    }
  }
`

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        executionId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  getScenarioUrl = configurationId => {
    const { match } = this.props

    return generatePath(
      '/projects/:projectId/test-configurations/:configurationId',
      { ...match.params, configurationId }
    )
  }

  render() {
    const { classes, match } = this.props
    const { executionId } = match.params

    return (
      <div className={classes.root}>
        <Query query={GET_EXECUTION_QUERY} variables={{ executionId }}>
          {({ data, loading, error }) => {
            const execution = data.execution_by_pk

            return (
              <Loader loading={loading} fill>
                <SectionHeader
                  title={
                    <div className={classes.header}>
                      <div className={classes.headerScenario}>
                        <Link
                          component={RouterLink}
                          color="inherit"
                          to={this.getScenarioUrl(execution.configuration.id)}
                        >
                          {execution.configuration.name}
                        </Link>
                      </div>
                      <div className={classes.headerSeparator}>
                        <ChevronRight />
                      </div>
                      <div className={classes.headerDate}>
                        {moment(execution.start_locust).format('YYYY-MM-DD')}
                      </div>
                    </div>
                  }
                  marginBottom
                />
              </Loader>
            )
          }}
        </Query>

        <Grid container spacing={16}>
          <Query
            query={GET_EXECUTION_RESULTS_PER_TICK_QUERY}
            variables={{ executionId }}
          >
            {({ data, loading, error }) => {
              if (error) return <p>Error: {error.message}</p>

              const resultsWithDates = data.result_aggregate.map(result => ({
                ...result,
                timestamp: +new Date(result.timestamp),
              }))

              return (
                <Loader loading={loading} fill>
                  <React.Fragment>
                    <Grid item xs={12} md={6}>
                      <Paper square className={classes.tile}>
                        <Typography
                          variant="subtitle2"
                          className={classes.tileTitle}
                        >
                          All Requests
                        </Typography>
                        <div className={classes.chartContainer}>
                          <TestExecutionRequestsChart
                            execution={data.execution_by_pk}
                            results={resultsWithDates}
                            syncId="sync-chart"
                          />
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper square className={classes.tile}>
                        <Typography
                          variant="subtitle2"
                          className={classes.tileTitle}
                        >
                          Requests Response Time
                        </Typography>
                        <div className={classes.chartContainer}>
                          <TestExecutionResponseTimeChart
                            execution={data.execution_by_pk}
                            results={resultsWithDates}
                            syncId="sync-chart"
                          />
                        </div>
                      </Paper>
                    </Grid>
                  </React.Fragment>
                </Loader>
              )
            }}
          </Query>
          <Query
            query={GET_EXECUTION_RESULTS_DISTRIBUTION_QUERY}
            variables={{ executionId }}
          >
            {({ data, loading, error }) => {
              let responses = []
              if (data.result_distribution.length > 0) {
                const result = data.result_distribution[0].request_result
                if (Array.isArray(result)) {
                  responses = result
                }
              }

              return (
                <Loader loading={loading} fill>
                  <Grid item xs={12}>
                    <Paper square className={classes.tile}>
                      <Typography variant="subtitle2" className={classes.tileTitle}>
                        Responses
                      </Typography>
                      <TestExecutionResponsesList
                        responses={responses}
                        showPagination
                      />
                    </Paper>
                  </Grid>
                </Loader>
              )
            }}
          </Query>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
