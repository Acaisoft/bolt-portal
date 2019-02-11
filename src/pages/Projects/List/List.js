import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Edit } from '@material-ui/icons'

import AddButton from '~components/AddButton'
import styles from './List.styles'
import ProjectForm from './components/ProjectForm'
import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

export class List extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    type: null,
    updateFormValues: {
      name: null,
      description: null,
      image: null,
      id: null,
    },
  }

  toggleDrawer = (type, status) => {
    this.setState({
      open: status,
      type: type,
      updateFormValues: {
        name: null,
        description: null,
        image: null,
        id: null,
      },
    })
  }

  openUpdateProject = (e, name, description, id) => {
    e.preventDefault()
    this.setState({
      open: true,
      type: 'update',
      updateFormValues: {
        name,
        description,
        image: 'path/to/img.png',
        id,
      },
    })
  }

  render() {
    const { match, classes } = this.props
    const { open, updateFormValues, type } = this.state

    return (
      <Query query={GET_PROJECTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          const projects = data.project

          return (
            <div className={classes.root}>
              <ProjectForm
                open={open}
                type={type}
                courseInitData={updateFormValues}
                close={this.toggleDrawer}
              />
              <div className={classes.btnContainer}>
                <AddButton open={this.toggleDrawer} />
              </div>
              <Grid container spacing={24}>
                {projects.map(project => (
                  <Grid item xs={3} key={project.id}>
                    <Card
                      className={classes.card}
                      component={Link}
                      to={`${match.url}/${project.name.split(' ').join('-')}`}
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
                          onClick={event =>
                            this.openUpdateProject(
                              event,
                              project.name,
                              project.description,
                              project.id
                            )
                          }
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(List)
