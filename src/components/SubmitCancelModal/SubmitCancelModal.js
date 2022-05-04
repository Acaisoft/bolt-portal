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

export function SubmitCancelModal({
  cancelLabel = 'Cancel',
  children,
  id = 'submit-cancel-modal',
  isOpen = false,
  onClose,
  onSubmit,
  submitLabel = 'Submit',
  title = 'Confirm deletion',
}) {
  return (
    <Dialog
      data-testid="SubmitCancelModal"
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-description`}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelLabel}
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" autoFocus>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
SubmitCancelModal.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  title: PropTypes.string,
}

export default SubmitCancelModal
