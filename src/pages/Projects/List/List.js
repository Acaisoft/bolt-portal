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

import AcaiBoltImg from '~assets/images/img.png'

import styles from './List.styles'

import fakeProjects from '../projectsData.mock'

import CreateProject from './components/CreateProject'

export class List extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    openForm: false,
  }

  handleOpenForm = () => {
    this.setState({ openForm: true })
  }

  handleClose = () => {
    this.setState({ openForm: false })
  }

  render() {
    const { match, classes } = this.props
    const { openForm } = this.state

    return (
      <div className={classes.root}>
        <CreateProject open={openForm} close={this.handleClose} />
        <div className={classes.btnContainer}>
          <Fab color="primary" aria-label="Add" onClick={this.handleOpenForm}>
            <AddIcon />
          </Fab>
        </div>
        <Grid container spacing={24}>
          {fakeProjects.map(project => (
            <Grid item xs={3} key={project.id}>
              <Card
                className={classes.card}
                component={Link}
                to={`${match.url}/${project.id}/details`}
                aria-label="Project Deitals"
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body1">{project.description}</Typography>
                  <img src={AcaiBoltImg} alt="Acai Bolt" />
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
