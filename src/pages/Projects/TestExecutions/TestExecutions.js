import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Link } from 'react-router-dom'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'

import { DataTable } from '~components'
import { GET_PROJECT_EXECUTIONS_QUERY } from '~services/GraphQL/Queries'
import styles from './TestExecutions.styles'

export class TestExecutions extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
  }

  render() {
    const { classes, projectId } = this.props

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
            {({ data, loading, error }) => {
              return (
                <DataTable
                  data={data && data.execution}
                  isLoading={loading}
                  rowKey={test => test.id}
                >
                  <DataTable.Column
                    key="runDate"
                    render={test => test.start}
                    title="Run Date"
                  />
                  <DataTable.Column
                    key="status"
                    render={test => test.status}
                    title="Status"
                  />
                  <DataTable.Column
                    key="type"
                    render={test => test.configuration.configuration_type.name}
                    title="Type"
                  />
                  <DataTable.Column
                    key="config"
                    render={test => test.configuration.name}
                    title="Configuration"
                  />
                  <DataTable.Column
                    key="total"
                    render={test =>
                      test.result_aggregate_aggregate.aggregate.sum
                        .number_of_fails ||
                      0 +
                        test.result_aggregate_aggregate.aggregate.sum
                          .number_of_successes ||
                      0
                    }
                    title="Total"
                  />
                  <DataTable.Column
                    key="passed"
                    render={test =>
                      test.result_aggregate_aggregate.aggregate.sum
                        .number_of_successes || 0
                    }
                    title="Passed"
                  />
                  <DataTable.Column
                    key="fails"
                    render={test =>
                      test.result_aggregate_aggregate.aggregate.sum
                        .number_of_fails || 0
                    }
                    title="Fails"
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
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TestExecutions)
