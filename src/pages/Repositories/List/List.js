import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import { Typography, withStyles } from '@material-ui/core'
import { AddButton, DeleteModal } from '~components'
import { TestSourcesList } from '~containers/lists'

import styles from './List.styles'
import { GET_TEST_SOURCES_QUERY } from '~services/GraphQL/Queries'
import { DELETE_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  emptyFormValues = {
    name: '',
    url: '',
    id: null,
  }

  state = {
    isDeleteModalOpen: false,
    selectedRepository: '',
  }

  handleCreate = () => {
    const { history, match } = this.props
    history.push(`${match.url}/create`)
  }

  handleEdit = ({ id }) => {
    const { history, match } = this.props
    history.push(`${match.url}/${id}`)
  }

  handleDelete = repository => {
    this.setState({ isDeleteModalOpen: true, selectedRepository: repository })
  }

  handleDeleteSubmit = async ({ delMutation }) => {
    const { selectedRepository } = this.state
    await delMutation({ variables: { id: selectedRepository.id } })
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false })
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params
    const { isDeleteModalOpen, selectedRepository } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
        <Mutation
          mutation={DELETE_REPOSITORY_MUTATION}
          refetchQueries={[
            { query: GET_TEST_SOURCES_QUERY, variables: { projectId } },
          ]}
        >
          {(delMutation, { data }) =>
            isDeleteModalOpen && (
              <DeleteModal
                onClose={this.handleCloseDeleteModal}
                onSubmit={() => this.handleDeleteSubmit({ delMutation })}
                type="repository"
                name={selectedRepository.name}
              />
            )
          }
        </Mutation>
        <div className={classes.btnContainer}>
          <AddButton onClick={this.handleCreate} />
        </div>
        <TestSourcesList
          projectId={projectId}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          showPagination
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)
