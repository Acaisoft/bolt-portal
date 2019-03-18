import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Typography, withStyles } from '@material-ui/core'

import { GET_PROJECT_EXECUTIONS_QUERY } from '~services/GraphQL/Queries'

import ExecutionsTable from '~components/ExecutionsTable'
import styles from './TestExecutions.styles'

export class TestExecutions extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, projectId, match } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
        <div className={classes.tableContainer}>
          <Query
            query={GET_PROJECT_EXECUTIONS_QUERY}
            variables={{
              projectId,
              limit: 10,
              offset: 0,
              order_by: [{ start: 'desc' }],
            }}
          >
            {({ data, loading, error }) => (
              <ExecutionsTable
                executions={data && data.execution}
                loading={loading}
                getDetailsRoute={execution => `${match.url}/${execution.id}`}
              />
            )}
          </Query>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TestExecutions)
