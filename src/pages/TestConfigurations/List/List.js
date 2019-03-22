import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { Typography, withStyles } from '@material-ui/core'

import { DeleteModal } from '~components'
import { TestConfigurationsList } from '~containers/lists'
import styles from './List.styles'

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

  handleEdit = configuration => {
    const { history, match } = this.props
    history.push(`${match.url}/${configuration.id}`)
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params
    const { isDeleteModalOpen, selectedItem } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you can manage all Test Run Configurations
        </Typography>
        <Mutation
          mutation={DELETE_CONFIG_MUTATION}
          refetchQueries={[{ query: GET_CONFIGS_QUERY, variables: { projectId } }]}
        >
          {(delMutation, { data }) =>
            isDeleteModalOpen && (
              <DeleteModal
                onClose={this.handleDeleteModalClose}
                onSubmit={() => this.handleDeleteSubmit({ delMutation })}
                type="repository"
                name={selectedItem.name}
              />
            )
          }
        </Mutation>
        <TestConfigurationsList
          projectId={projectId}
          showPagination
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)
