import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'
import styles from './ProjectsList.styles'

export class ProjectsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { classes, onDetails, onEdit } = this.props

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
            <Grid container spacing={24}>
              {projects.map(project => (
                <Grid item xs={3} key={project.id}>
                  <Card
                    className={classes.card}
                    onClick={() => {
                      onDetails(project)
                    }}
                    aria-label="Project Details"
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {project.name}
                      </Typography>
                      {project.description && (
                        <Typography variant="body1">
                          {project.description.length > 200
                            ? `${project.description.slice(0, 200)}...`
                            : project.description}
                        </Typography>
                      )}
                      <IconButton
                        className={classes.editIcon}
                        onClick={e => {
                          e.stopPropagation()
                          onEdit(project)
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(ProjectsList)
