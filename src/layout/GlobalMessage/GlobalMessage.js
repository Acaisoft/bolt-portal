import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IconButton, Snackbar } from '@material-ui/core'

import { Close } from '@material-ui/icons'

export class GlobalMessage extends Component {
  static propTypes = {
    autoHideDuration: PropTypes.number,
    hideMessage: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  handleClose = (event, reason) => {
    const { autoHideDuration, hideMessage } = this.props
    if (autoHideDuration > 0 || reason !== 'timeout') {
      hideMessage(reason)
    }
  }

  renderMessage = () => {
    const { message } = this.props

    return <span id="message-content">{message}</span>
  }

  render() {
    const { autoHideDuration, isOpen } = this.props

    return (
      <Snackbar
        autoHideDuration={autoHideDuration}
        message={this.renderMessage()}
        open={isOpen}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-content',
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <Close />
          </IconButton>,
        ]}
      />
    )
  }
}

const mapState = ({ messages: { autoHideDuration, isOpen, message } }) => ({
  isOpen,
  message,
  autoHideDuration,
})
const mapDispatch = ({ messages: { hideMessage } }) => ({ hideMessage })

export default connect(
  mapState,
  mapDispatch
)(GlobalMessage)
