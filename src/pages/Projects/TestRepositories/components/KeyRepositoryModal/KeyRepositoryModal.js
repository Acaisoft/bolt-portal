import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'

import styles from './KeyRepositoryModal.styles'

export class KeyRepositoryModal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="modal-key-title"
          aria-describedby="modal-key-description"
        >
          <DialogTitle id="modal-key-title">{'REPOSITORY KEY'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="modal-key-description">
              Copy it and do the magic in your repository: <br />
              Generated Key(TODO)...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.handleClose}
              color="primary"
              variant="contained"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(KeyRepositoryModal)
