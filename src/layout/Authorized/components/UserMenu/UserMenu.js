import React, { useContext } from 'react'
import { AccountCircle, ExitToApp } from '@material-ui/icons'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import { AuthKeycloakContext } from '~contexts'
import { useMenu } from '~hooks'

function UserMenu() {
  const { isMenuOpen, menuAnchorEl, handleMenuOpen, handleMenuClose } = useMenu()
  const { logout } = useContext(AuthKeycloakContext)

  return (
    <div>
      <IconButton
        aria-label="User Menu"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={menuAnchorEl}
        getContentAnchorEl={null} // Required to be able to set anchorOrigin.vertical
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
