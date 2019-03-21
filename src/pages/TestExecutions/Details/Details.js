import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { Typography, withStyles } from '@material-ui/core'

import { GET_EXECUTION_RESULTS_PER_TICK_QUERY } from '~services/GraphQL/Queries'

import styles from './Details.styles'
import { charts } from '~containers'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, match } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.tableContainer}>
          Test Run details for {match.params.executionId}
        </div>
        <Query
          query={GET_EXECUTION_RESULTS_PER_TICK_QUERY}
          variables={{ executionId: match.params.executionId }}
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
                <charts.TestExecutionRequests
                  execution={data.execution_by_pk}
                  results={resultsWithDates}
                  syncId="sync-chart"
                />
                <Typography variant="h6">REQUESTS RESPONSE TIME</Typography>
                <charts.TestExecutionResponseTime
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
