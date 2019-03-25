import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { Typography } from '@material-ui/core'

import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

import ProjectsList from './ProjectsList.component'

export class ProjectsListContainer extends Component {
  static propTypes = {
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { onDetails, onEdit } = this.props

    return (
      <Query query={GET_PROJECTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          const projects = data.project

          if (projects.length === 0) {
            return <Typography variant="body1">No projects</Typography>
          }

          return (
            <ProjectsList
              projects={projects}
              onDetails={onDetails}
              onEdit={onEdit}
            />
          )
        }}
      </Query>
    )
  }
}

export default ProjectsListContainer
