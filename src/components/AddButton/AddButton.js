import React, { Component } from 'react'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export class AddButton extends Component {
  handleClick = () => {
    this.props.open('create', true)
  }

  render() {
    return (
      <Fab color="primary" aria-label="Add" onClick={this.handleClick}>
        <Add />
      </Fab>
    )
  }
}

export default AddButton
