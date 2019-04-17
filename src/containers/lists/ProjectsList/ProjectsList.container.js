import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { Menu, MenuItem, Typography } from '@material-ui/core'
import { SectionHeader } from '~components'

import ProjectsList from './ProjectsList.component'
import { GET_PROJECTS } from './graphql'

export class ProjectsListContainer extends Component {
  static propTypes = {
    onDetails: PropTypes.func.isRequired,
  }

  state = {
    editedItem: null,
    selectedItem: null,
    menuAnchorEl: null,
  }

  emptyFormValues = {
    name: '',
    description: '',
    image_url: '',
    image_preview_url: '',
    id: null,
  }

  handleCreate = () => {
    this.setState({
      editedItem: {
        ...this.emptyFormValues,
        id: 'new-project',
      },
    })
  }

  handleEdit = () => {
    this.setState(
      state => ({
        editedItem: {
          ...state.selectedItem,
          image_preview_url: state.selectedItem.image_url,
        },
      }),
      () => {
        console.log('handleEdit', this.state)
      }
    )

    this.handleMenuClose()
  }

  handleMenuOpen = (e, project) => {
    this.setState({
      selectedItem: project,
      menuAnchorEl: e.currentTarget,
    })
  }

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null })
  }

  handleFormClose = () => {
    this.setState({ menuAnchorEl: null, editedItem: null, selectedItem: null })
  }

  render() {
    const {
      onDetails,
      projectsQuery: { projects = [], error, loading },
    } = this.props
    const { editedItem, menuAnchorEl } = this.state

    if (error) return <Typography variant="body1">Error :(</Typography>

    return (
      <React.Fragment>
        <SectionHeader
          title="Your Projects"
          subtitle={`(${projects.length})`}
          marginBottom
        />
        <ProjectsList
          loading={loading}
          projects={projects}
          editedItem={editedItem}
          onCreate={this.handleCreate}
          onDetails={onDetails}
          onFormCancel={this.handleFormClose}
          onFormSubmit={this.handleFormClose}
          onMenuOpen={this.handleMenuOpen}
          onMenuClose={this.handleMenuClose}
        />
        <Menu
          id="project-menu"
          anchorEl={menuAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleEdit}>Edit project</MenuItem>
        </Menu>
      </React.Fragment>
    )
  }
}

export default graphql(GET_PROJECTS, {
  name: 'projectsQuery',
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(ProjectsListContainer)
