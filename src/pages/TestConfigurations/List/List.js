import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { withStyles } from '@material-ui/core'

import { DeleteModal } from '~components'
import { TestConfigurationsList } from '~containers/lists'
import styles from './List.styles'

import { getSubpageUrl } from '~utils/router'
import { DELETE_CONFIG_MUTATION } from '~services/GraphQL/Mutations'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  state = {
    isDeleteModalOpen: false,
    selectedItem: null,
  }

  handleDeleteSubmit = async ({ delMutation }) => {
    const { selectedItem } = this.state

    await delMutation({ variables: { id: selectedItem.id } })
    this.handleDeleteModalClose()
  }

  handleDelete = selectedItem => {
    this.setState({ isDeleteModalOpen: true, selectedItem })
  }

  handleDeleteModalClose = () => {
    this.setState({ isDeleteModalOpen: false })
  }

  redirectToSubpage = (relativePath, params = {}) => {
    const { history, match } = this.props

    history.push(getSubpageUrl(match, relativePath, params))
  }

  handleCreate = () => {
    this.redirectToSubpage('/create')
  }

  handleDetails = configuration => {
    this.redirectToSubpage('/:configurationId', {
      configurationId: configuration.id,
    })
  }

  handleEdit = configuration => {
    this.redirectToSubpage('/:configurationId/edit', {
      configurationId: configuration.id,
    })
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params
    const { isDeleteModalOpen, selectedItem } = this.state

    return (
      <div className={classes.root}>
        <Mutation
          mutation={DELETE_CONFIG_MUTATION}
          refetchQueries={[{ query: GET_CONFIGS_QUERY, variables: { projectId } }]}
        >
          {(delMutation, { data }) =>
            isDeleteModalOpen && (
              <DeleteModal
                onClose={this.handleDeleteModalClose}
                onSubmit={() => this.handleDeleteSubmit({ delMutation })}
                type="test source"
                name={selectedItem.name}
              />
            )
          }
        </Mutation>
        <TestConfigurationsList
          projectId={projectId}
          showPagination
          onCreate={this.handleCreate}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onDetails={this.handleDetails}
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)
