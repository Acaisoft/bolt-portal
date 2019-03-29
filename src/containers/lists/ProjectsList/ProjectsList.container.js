import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { Menu, MenuItem, Typography } from '@material-ui/core'
import { RemoteList } from '~containers'
import { SectionHeader } from '~components'

import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

import ProjectsList from './ProjectsList.component'

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
    const { onDetails } = this.props
    const { editedItem, menuAnchorEl } = this.state

    return (
      <RemoteList query={GET_PROJECTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (error) return <Typography variant="body1">Error :(</Typography>

          const projects = !loading
            ? (data.project || []).map(project => ({
                ...project,
                progress: 70, // Mock project progress
              }))
            : []

          return (
            <React.Fragment>
              <SectionHeader
                title="Your Projects"
                subtitle={`(${projects.length})`}
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
        }}
      </RemoteList>
    )
  }
}

export default ProjectsListContainer
