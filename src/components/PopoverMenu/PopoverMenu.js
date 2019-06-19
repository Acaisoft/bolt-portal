import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from '@material-ui/core'
import { useMenu } from '~hooks'

const noop = () => {}

function PopoverMenu({
  children,
  closeOnClick = false,
  id,
  onClose = noop,
  onOpen = noop,
  trigger,
  MenuProps,
}) {
  const { menuAnchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu()

  const triggerEl = React.cloneElement(trigger, {
    'aria-controls': id,
    'aria-haspopup': 'menu',
    onClick: evt => {
      handleMenuOpen(evt)
      onOpen(evt)
    },
  })

  const menuItems = React.Children.map(children, child => {
    if (!child) {
      return null
    }

    const childOnClick =
      typeof child.props.onClick === 'function' ? child.props.onClick : noop

    return React.cloneElement(child, {
      onClick: evt => {
        childOnClick(evt)
        if (closeOnClick) {
          handleMenuClose(evt)
          onClose(evt)
        }
      },
    })
  })

  return (
    <React.Fragment>
      {triggerEl}
      {isMenuOpen && (
        <Menu
          MenuListProps={{ id }}
          anchorEl={menuAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open
          onClose={evt => {
            handleMenuClose(evt)
            onClose(evt)
          }}
          {...MenuProps}
        >
          {menuItems}
        </Menu>
      )}
    </React.Fragment>
  )
}
PopoverMenu.propTypes = {
  children: PropTypes.node,
  closeOnClick: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  trigger: PropTypes.element,
  MenuProps: PropTypes.object,
}

export default PopoverMenu
