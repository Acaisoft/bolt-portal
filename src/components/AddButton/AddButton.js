import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

export class AddButton extends Component {
  handleClick = () => {
    this.props.open('create', true)
  }

  render() {
    return (
      <Fab color="primary" aria-label="Add" onClick={this.handleClick}>
        <AddIcon />
      </Fab>
    )
  }
}

export default AddButton
