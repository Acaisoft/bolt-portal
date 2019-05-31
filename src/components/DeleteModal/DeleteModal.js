import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

export class DeleteModal extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const { onClose, onSubmit, name, type } = this.props

    return (
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete {type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure want delete <q>{name}</q> {type}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteModal
