import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import { Typography, withStyles } from '@material-ui/core'
import { AddButton, DeleteModal } from '~components'
import { RepositoryForm } from '~containers/forms'
import { RepositoriesList } from '~containers/lists'

import styles from './TestRepositories.styles'
import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'
import { DELETE_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'

export class TestRepositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    projectId: PropTypes.string,
  }

  emptyFormValues = {
    name: null,
    url: null,
    id: null,
  }

  state = {
    open: false,
    openDeleteModal: false,
    type: null,
    formValues: this.emptyFormValues,
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
      formValues: {
        name: '',
        url: '',
        projectId: this.props.projectId,
      },
    })
  }

  handleEdit = ({ id, name, url }) => {
    this.setState({
      open: true,
      type: 'update',
      formValues: {
        name,
        url,
        id,
      },
    })
  }

  handleDelete = ({ id, name }) => {
    this.setState({ openDeleteModal: true, repoName: name, deleteRepoId: id })
  }

  render() {
    const { classes, projectId } = this.props
    const {
      open,
      formValues,
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
        <RepositoryForm
          open={open}
          type={type}
          initialValues={formValues}
          close={this.toggleDrawer}
        />
        <div className={classes.btnContainer}>
          <AddButton open={this.toggleDrawer} />
        </div>
        <RepositoriesList
          projectId={projectId}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          showPagination
        />
      </div>
    )
  }
}

export default withStyles(styles)(TestRepositories)
