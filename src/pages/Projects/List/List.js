import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Edit } from '@material-ui/icons'

import AcaiBoltImg from '~assets/images/img.png'

import styles from './List.styles'

import fakeProjects from '../projectsData.mock'

import ProjectForm from './components/ProjectForm'

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
      },
    })
  }

  openUpdateProject = (e, name, description) => {
    e.preventDefault()
    this.setState({
      open: true,
      type: 'update',
      updateFormValues: {
        name,
        description,
        image: 'path/to/img.png',
      },
    })
  }

  render() {
    const { match, classes } = this.props
    const { open, updateFormValues, type } = this.state

    return (
      <div className={classes.root}>
        <ProjectForm
          open={open}
          type={type}
          courseInitData={updateFormValues}
          close={this.toggleDrawer}
        />
        <div className={classes.btnContainer}>
          <Fab
            color="primary"
            aria-label="Add"
            onClick={() => this.toggleDrawer('create', true)}
          >
            <AddIcon />
          </Fab>
        </div>
        <Grid container spacing={24}>
          {fakeProjects.map((
            project // Update mock projects
          ) => (
            <Grid item xs={3} key={project.id}>
              <Card
                className={classes.card}
                component={Link}
                to={`${match.url}/${project.id}`}
                aria-label="Project Deitals"
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body1">{project.description}</Typography>
                  <img src={AcaiBoltImg} alt="Acai Bolt" />
                  <Edit
                    className={classes.editIcon}
                    onClick={event =>
                      this.openUpdateProject(
                        event,
                        project.name,
                        project.description
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
  }
}

export default withStyles(styles)(List)
