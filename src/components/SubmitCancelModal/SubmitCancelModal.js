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

export class SubmitCancelModal extends React.Component {
  static propTypes = {
    cancelLabel: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    cancelLabel: 'Cancel',
    id: 'submit-cancel-modal',
    isOpen: false,
    submitLabel: 'Submit',
    title: 'Confirm deletion',
  }

  render() {
    const {
      cancelLabel,
      children,
      id,
      onClose,
      onSubmit,
      isOpen,
      submitLabel,
      title,
    } = this.props

    return (
      <Dialog
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
}

export default SubmitCancelModal
