import React, { useContext } from 'react'
import { AccountCircle, ExitToApp } from '@material-ui/icons'
import { IconButton, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

import { PopoverMenu } from '~components'
import { AuthKeycloakContext } from '~contexts'

function UserMenu() {
  const { logout } = useContext(AuthKeycloakContext)

  return (
    <div>
      <PopoverMenu
        id="user-menu"
        closeOnClick
        trigger={
          <IconButton aria-label="User Menu" color="inherit">
            <AccountCircle />
          </IconButton>
        }
        MenuProps={{
          getContentAnchorEl: null, // Required to be able to set anchorOrigin.vertical
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }}
      >
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </PopoverMenu>
    </div>
  )
}

export default UserMenu
