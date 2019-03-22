import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'
import styles from './ProjectsList.styles'

export class ProjectsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { classes, onEdit } = this.props

    return (
      <Query query={GET_PROJECTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          const projects = data.project

          return (
            <Grid container spacing={24}>
              {projects.map(project => (
                <Grid item xs={3} key={project.id}>
                  <Card
                    className={classes.card}
                    component={Link}
                    to={`/projects/${project.id}`}
                    aria-label="Project Deitals"
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
                      <Edit
                        className={classes.editIcon}
                        onClick={event => onEdit(event, project)}
                      />
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
