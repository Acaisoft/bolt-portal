import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles, Drawer } from '@material-ui/core'

import { AddButton } from '~components'
import { forms, lists } from '~containers'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
  }

  emptyFormValues = {
    name: '',
    description: '',
    image: '',
    id: null,
  }

  state = {
    open: false,
    type: null,
    formValues: this.emptyFormValues,
  }

  openDrawer = type => {
    this.setState({
      open: true,
      type,
    })
  }

  closeDrawer = () => {
    this.setState({
      open: false,
      formValues: this.emptyFormValues,
    })
  }

  handleEdit = (e, { name, description, id }) => {
    e.preventDefault()
    this.setState({
      open: true,
      type: 'update',
      formValues: {
        name,
        description,
        image: 'path/to/img.png',
        id,
      },
    })
  }

  render() {
    const { classes } = this.props
    const { open, formValues, type } = this.state

    return (
      <div className={classes.root}>
        <Drawer
          open={open}
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <forms.Project
            initialValues={formValues}
            onCancel={this.closeDrawer}
            onSubmit={this.closeDrawer}
            type={type}
          />
        </Drawer>
        <div className={classes.btnContainer}>
          <AddButton onClick={() => this.openDrawer('create')} />
        </div>
        <lists.Projects onEdit={this.handleEdit} />
      </div>
    )
  }
}

export default withStyles(styles)(List)
