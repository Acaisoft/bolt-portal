import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import moment from 'moment'

import { generatePath, Link as RouterLink } from 'react-router-dom'
import { Query } from 'react-apollo'
import { withStyles, Paper, Grid, Link } from '@material-ui/core'

import { Loader, SectionHeader, ZoomButton, NoDataPlaceholder } from '~components'
import { ChevronRight } from '@material-ui/icons'

import {
  RequestsChart,
  RequestsPerSecondChart,
  ResponseTimeChart,
  ResultsPerEndpointChart,
  UsersSpawnChart,
} from './components/charts'
import { ResponsesTable } from './components/tables'

import {
  GET_EXECUTION_RESULTS_PER_TICK_QUERY,
  GET_EXECUTION_RESULTS_DISTRIBUTION_QUERY,
} from '~services/GraphQL/Queries'

import styles from './Details.styles'

const GET_EXECUTION_QUERY = gql`
  query getExecution($executionId: uuid!) {
    execution_by_pk(id: $executionId) {
      id
      start
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

  state = {
    isZoomed: false,
  }

  handleZoomIn = () => {
    this.setState({ isZoomed: true })
  }

  handleZoomOut = () => {
    this.setState({ isZoomed: false })
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

    const { isZoomed } = this.state

    return (
      <div className={classes.root}>
        <Query query={GET_EXECUTION_QUERY} variables={{ executionId }}>
          {({ data, loading, error }) => {
            if (loading) return <Loader loading fill />
            const execution = data.execution_by_pk

            return (
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
                      {moment(execution.start_locust || execution.start).format(
                        'YYYY-MM-DD'
                      )}
                    </div>
                  </div>
                }
                marginBottom
              />
            )
          }}
        </Query>

        <Grid container spacing={16}>
          <Query
            query={GET_EXECUTION_RESULTS_PER_TICK_QUERY}
            variables={{ executionId }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loader loading fill />
              if (error) return <p>Error: {error.message}</p>

              const resultsWithDates = data.result_aggregate.map(result => ({
                ...result,
                timestamp: +new Date(result.timestamp),
              }))
              const execution = data.execution_by_pk

              return (
                <React.Fragment>
                  <Grid item xs={12} md={isZoomed ? 12 : 4}>
                    <Paper square className={classes.tile}>
                      <SectionHeader
                        size="small"
                        className={classes.tileTitle}
                        title="All Requests"
                      >
                        <ZoomButton
                          isZoomed={isZoomed}
                          onZoomIn={this.handleZoomIn}
                          onZoomOut={this.handleZoomOut}
                        />
                      </SectionHeader>
                      <div className={classes.chartContainer}>
                        <RequestsChart
                          execution={execution}
                          data={resultsWithDates}
                          syncId="sync-chart"
                        />
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={isZoomed ? 12 : 4}>
                    <Paper square className={classes.tile}>
                      <SectionHeader
                        size="small"
                        className={classes.tileTitle}
                        title="Requests Response Time"
                      >
                        <ZoomButton
                          isZoomed={isZoomed}
                          onZoomIn={this.handleZoomIn}
                          onZoomOut={this.handleZoomOut}
                        />
                      </SectionHeader>
                      <div className={classes.chartContainer}>
                        <ResponseTimeChart
                          execution={execution}
                          data={resultsWithDates}
                          syncId="sync-chart"
                        />
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={isZoomed ? 12 : 4}>
                    <Paper square className={classes.tile}>
                      <SectionHeader
                        size="small"
                        className={classes.tileTitle}
                        title="Users Spawn"
                      >
                        <ZoomButton
                          isZoomed={isZoomed}
                          onZoomIn={this.handleZoomIn}
                          onZoomOut={this.handleZoomOut}
                        />
                      </SectionHeader>
                      <div className={classes.chartContainer}>
                        <UsersSpawnChart
                          execution={execution}
                          data={resultsWithDates}
                          syncId="sync-chart"
                        />
                      </div>
                    </Paper>
                  </Grid>
                </React.Fragment>
              )
            }}
          </Query>
          <Query
            query={GET_EXECUTION_RESULTS_DISTRIBUTION_QUERY}
            variables={{ executionId }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loader loading fill />

              const noDataMessage = 'Waiting for test results...'

              const distribution = data.result_distribution[0]
              const requestResults = (
                (distribution && distribution.request_result) ||
                []
              )
                .map(result => ({
                  ...result,
                  '# successes': +result['# requests'] - +result['# failures'],
                }))
                .filter(result => result.Name !== 'Total') // TODO: Remove when backend handles this.

              return (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <Paper square className={classes.tile}>
                      <SectionHeader
                        size="small"
                        className={classes.tileTitle}
                        title="Request Results"
                      />
                      <NoDataPlaceholder label={noDataMessage} data={requestResults}>
                        <ResultsPerEndpointChart data={requestResults} />
                      </NoDataPlaceholder>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper square className={classes.tile}>
                      <SectionHeader
                        size="small"
                        className={classes.tileTitle}
                        title="Requests/Second by request"
                      />
                      <NoDataPlaceholder label={noDataMessage} data={requestResults}>
                        <RequestsPerSecondChart data={requestResults} />
                      </NoDataPlaceholder>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper square className={classes.tile}>
                      <NoDataPlaceholder label={noDataMessage} data={requestResults}>
                        <ResponsesTable data={requestResults} onDetails={() => {}} />
                      </NoDataPlaceholder>
                    </Paper>
                  </Grid>
                </React.Fragment>
              )
            }}
          </Query>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
