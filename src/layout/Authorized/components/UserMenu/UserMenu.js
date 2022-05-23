import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { ExitToApp, ExpandMore } from '@material-ui/icons'
import React from 'react'
import { useAuth } from 'contexts/AuthContext'
import { PopoverMenu, Button } from 'components'
import UserAvatar from '../UserAvatar'
import useStyles from './UserMenu.styles'

function UserMenu() {
  const classes = useStyles()
  const { logout, user } = useAuth()

  return (
    <div>
      <PopoverMenu
        id="user-menu"
        closeOnClick
        trigger={
          <Button aria-label="User Menu" color="inherit">
            <UserAvatar />
            <span className={classes.userName}>{user.firstName}</span>
            <ExpandMore className={classes.expandIcon} />
          </Button>
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
