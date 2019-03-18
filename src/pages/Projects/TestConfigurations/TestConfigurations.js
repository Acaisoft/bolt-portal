import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Mutation, Query } from 'react-apollo'

import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Edit, Delete, History, PlayArrow } from '@material-ui/icons'

import { DataTable, DeleteModal } from '~components'
import styles from './TestConfigurations.styles'

import { DELETE_CONFIG_MUTATION } from '~services/GraphQL/Mutations'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class TestConfigurations extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string,
  }

  state = {
    openDeleteModal: false,
    configName: '',
    deleteConfigId: null,
  }

  handleSubmit = async (id, { delMutation }) => {
    await delMutation({ variables: { id } })
    this.setState({ openDeleteModal: false })
  }

  handleModalOpen = (id, name) => {
    this.setState({ openDeleteModal: true, configName: name, deleteConfigId: id })
  }

  handleModalClose = () => {
    this.setState({ openDeleteModal: false })
  }

  render() {
    const { classes, projectId } = this.props
    const { openDeleteModal, configName, deleteConfigId } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you can manage all Test Run Configurations
        </Typography>
        <Mutation
          mutation={DELETE_CONFIG_MUTATION}
          refetchQueries={[{ query: GET_CONFIGS_QUERY, variables: { projectId } }]}
        >
          {(delMutation, { data }) => (
            <DeleteModal
              open={openDeleteModal}
              handleClose={this.handleModalClose}
              handleSubmit={() => this.handleSubmit(deleteConfigId, { delMutation })}
              type="repository"
              name={configName}
            />
          )}
        </Mutation>
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
                          onClick={() => this.handleModalOpen(test.id, test.name)}
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
