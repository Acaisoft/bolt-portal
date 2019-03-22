import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles, Drawer, Typography } from '@material-ui/core'

import { AddButton } from '~components'
import { ProjectForm } from '~containers/forms'
import { ProjectsList } from '~containers/lists'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  emptyFormValues = {
    name: '',
    description: '',
    image: '',
    id: null,
  }

  state = {
    isDrawerOpen: false,
    mode: 'create',
    formValues: this.emptyFormValues,
  }

  closeDrawer = () => {
    this.setState({
      isDrawerOpen: false,
      formValues: this.emptyFormValues,
    })
  }

  handleCreate = () => {
    this.setState({
      isDrawerOpen: true,
      mode: 'create',
    })
  }

  handleEdit = ({ name, description, id }) => {
    this.setState({
      isDrawerOpen: true,
      mode: 'edit',
      formValues: {
        name,
        description,
        image: 'path/to/img.png',
        id,
      },
    })
  }

  handleDetails = ({ id }) => {
    const { history, match } = this.props
    history.push(`${match.url}/${id}`)
  }

  render() {
    const { classes } = this.props
    const { isDrawerOpen, formValues, mode } = this.state

    return (
      <div className={classes.root}>
        <Drawer
          open={isDrawerOpen}
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <Typography variant="h3">
            {mode ? 'NEW PROJECT' : 'UPDATE PROJECT'}
          </Typography>
          <Typography variant="body1">
            {mode
              ? 'Add new project to your library'
              : `Update ${this.props.initialValues.name} project data.`}
          </Typography>
          <ProjectForm
            initialValues={formValues}
            mode={mode}
            onCancel={this.closeDrawer}
            onSubmit={this.closeDrawer}
          />
        </Drawer>
        <div className={classes.btnContainer}>
          <AddButton onClick={this.handleCreate} />
        </div>
        <ProjectsList onDetails={this.handleDetails} onEdit={this.handleEdit} />
      </div>
    )
  }
}

export default withStyles(styles)(List)
