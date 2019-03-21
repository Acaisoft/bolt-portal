import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'

import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { AddButton, DataTable, DeleteModal } from '~components'
import { forms } from '~containers'

import styles from './TestRepositories.styles'
import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'
import { DELETE_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'

export class TestRepositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string,
  }

  state = {
    open: false,
    openDeleteModal: false,
    type: null,
    updateFormValues: {
      name: null,
      url: null,
      id: null,
      projectId: this.props.projectId,
    },
    repoName: '',
    deleteRepoId: null,
  }

  handleSubmit = async (id, { delMutation }) => {
    await delMutation({ variables: { id } })
    this.setState({ openDeleteModal: false })
  }

  handleModalOpen = (id, name) => {
    this.setState({ openDeleteModal: true, repoName: name, deleteRepoId: id })
  }

  handleModalClose = () => {
    this.setState({ openDeleteModal: false })
  }

  toggleDrawer = (type, status) => {
    this.setState({
      open: status,
      type: type,
      updateFormValues: {
        name: '',
        url: '',
        projectId: this.props.projectId,
      },
    })
  }

  updateFormDrawer = (e, name, url, id) => {
    e.preventDefault()
    this.setState({
      open: true,
      type: 'update',
      updateFormValues: {
        name,
        url,
        id,
      },
    })
  }

  addTestConfigs = configs => {
    let text = ''
    configs.map((conf, i) => {
      if (configs.length === i + 1) {
        return (text += conf.name)
      } else {
        return (text += `${conf.name} | `)
      }
    })
    return text
  }

  render() {
    const { classes, projectId } = this.props
    const {
      open,
      updateFormValues,
      type,
      openDeleteModal,
      repoName,
      deleteRepoId,
    } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
        <Mutation
          mutation={DELETE_REPOSITORY_MUTATION}
          refetchQueries={[
            { query: GET_REPOSITORIES_QUERY, variables: { projectId } },
          ]}
        >
          {(delMutation, { data }) => (
            <DeleteModal
              open={openDeleteModal}
              handleClose={this.handleModalClose}
              handleSubmit={() => this.handleSubmit(deleteRepoId, { delMutation })}
              type="repository"
              name={repoName}
            />
          )}
        </Mutation>
        <forms.Repository
          open={open}
          type={type}
          courseInitData={updateFormValues}
          close={this.toggleDrawer}
        />
        <div className={classes.btnContainer}>
          <AddButton open={this.toggleDrawer} />
        </div>
        <Query
          query={GET_REPOSITORIES_QUERY}
          variables={{ projectId }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            const repositories = data.repository

            return (
              <div className={classes.tableContainer}>
                <DataTable
                  data={repositories}
                  isLoading={loading}
                  rowKey={test => test.id}
                >
                  <DataTable.Column
                    key="name"
                    render={test => test.name}
                    title="Name"
                  />
                  <DataTable.Column
                    key="url"
                    render={test => test.url}
                    title="URL"
                  />
                  <DataTable.Column
                    key="testRunType"
                    render={test => test.configurationType.name}
                    title="Test Type"
                  />
                  <DataTable.Column
                    key="testRunConfigs"
                    render={test => this.addTestConfigs(test.configurations)}
                    title="Test Run Configurations"
                  />
                  <DataTable.Column
                    key="actions"
                    render={test => (
                      <div className={classes.iconsContainer}>
                        <IconButton
                          aria-label="Edit repository"
                          className={classes.icon}
                          onClick={event =>
                            this.updateFormDrawer(
                              event,
                              test.name,
                              test.url,
                              test.id
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="Delete repository"
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

export default withStyles(styles)(TestRepositories)
