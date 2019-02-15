import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Query } from 'react-apollo'

import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Edit, Delete, History, PlayArrow } from '@material-ui/icons'

import DataTable from '~components/DataTable'
import styles from './TestConfigurations.styles'

import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class TestConfigurations extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string,
  }

  render() {
    const { classes, projectId } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you can manage all Test Run Configurations
        </Typography>
        <Query
          query={GET_CONFIGS_QUERY}
          variables={{ projectId }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            const configurations = data.configuration

            return (
              <div className={classes.tableContainer}>
                <DataTable
                  data={configurations}
                  isLoading={loading}
                  rowKey={test => test.id}
                >
                  <DataTable.Column
                    key="name"
                    render={test => test.name}
                    title="Name"
                  />
                  <DataTable.Column
                    key="type"
                    render={test => test.configurationType.name}
                    title="Type"
                  />
                  <DataTable.Column
                    key="source"
                    render={test => test.repository.url}
                    title="Source"
                  />
                  <DataTable.Column
                    key="lastRun"
                    render={test => (
                      <div className={classes.dateContainer}>
                        {test.executions[0] && (
                          <React.Fragment>
                            <span>
                              {moment(test.executions[0].start).format('YYYY-MM-DD')}
                            </span>
                            <IconButton
                              aria-label="Delete repository"
                              className={classes.icon}
                              disabled
                            >
                              <History />
                            </IconButton>
                          </React.Fragment>
                        )}
                      </div>
                    )}
                    title="Last Run"
                  />
                  <DataTable.Column
                    key="actions"
                    render={test => (
                      <div className={classes.iconsContainer}>
                        <IconButton
                          aria-label="Start execution"
                          className={classes.icon}
                          disabled
                        >
                          <PlayArrow />
                        </IconButton>
                        <IconButton
                          aria-label="Edit configuration"
                          className={classes.icon}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="Delete configuration"
                          className={classes.icon}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    )}
                    title="Actions"
                  />
                </DataTable>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withStyles(styles)(TestConfigurations)
