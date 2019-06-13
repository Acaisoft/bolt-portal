import { IconButton, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React, { useContext } from 'react'
import { PopoverMenu } from '~components'
import { AuthKeycloakContext } from '~contexts'
import UserAvatar from '../UserAvatar'

function UserMenu() {
  const { logout } = useContext(AuthKeycloakContext)

  return (
    <div>
      <PopoverMenu
        id="user-menu"
        closeOnClick
        trigger={
          <IconButton aria-label="User Menu" color="inherit">
            <UserAvatar />
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
