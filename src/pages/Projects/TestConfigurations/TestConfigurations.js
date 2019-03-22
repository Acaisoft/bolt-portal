import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { Typography, withStyles } from '@material-ui/core'

import { DeleteModal } from '~components'
import { TestConfigurationsList } from '~containers/lists'
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

  handleModalOpen = ({ id, name }) => {
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
        <TestConfigurationsList
          projectId={projectId}
          showPagination
          onDelete={this.handleModalOpen}
        />
      </div>
    )
  }
}

export default withStyles(styles)(TestConfigurations)
