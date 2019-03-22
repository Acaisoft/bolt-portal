import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { Typography, withStyles } from '@material-ui/core'

import {
  TestExecutionRequestsChart,
  TestExecutionResponseTimeChart,
} from '~containers/charts'
import { GET_EXECUTION_RESULTS_PER_TICK_QUERY } from '~services/GraphQL/Queries'

import styles from './Details.styles'

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

  render() {
    const { classes, match } = this.props
    const { executionId } = match.params

    return (
      <div className={classes.root}>
        <div className={classes.tableContainer}>
          Test Run details for {executionId}
        </div>
        <Query
          query={GET_EXECUTION_RESULTS_PER_TICK_QUERY}
          variables={{ executionId }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>

            const resultsWithDates = data.result_aggregate.map(result => ({
              ...result,
              timestamp: +new Date(result.timestamp),
            }))

            return (
              <React.Fragment>
                <Typography variant="h6">REQUESTS</Typography>
                <TestExecutionRequestsChart
                  execution={data.execution_by_pk}
                  results={resultsWithDates}
                  syncId="sync-chart"
                />
                <Typography variant="h6">REQUESTS RESPONSE TIME</Typography>
                <TestExecutionResponseTimeChart
                  execution={data.execution_by_pk}
                  results={resultsWithDates}
                  syncId="sync-chart"
                />
              </React.Fragment>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
