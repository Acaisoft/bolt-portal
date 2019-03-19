import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { IconButton } from '@material-ui/core'

class LinkIconButton extends React.Component {
  handleClick = e => {
    const { history, onClick, to } = this.props

    if (to) {
      history.push(to)
    }

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render() {
    const { onClick, history, to, ...props } = this.props
    const { location, match, staticContext, ...buttonProps } = props

    return <IconButton onClick={this.handleClick} {...buttonProps} />
  }
}

LinkIconButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
}

export default withRouter(LinkIconButton)
