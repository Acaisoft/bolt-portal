import React from 'react'
import Badge from '@material-ui/core/Badge'
import { DefaultAvatar } from 'assets/icons'
import useStyles from './UserAvatar.styles'

function UserAvatar({ avatar, indicatorContent }) {
  const classes = useStyles()
  return (
    <Badge
      classes={{ badge: classes.badge }}
      badgeContent={indicatorContent}
      color="primary"
      overlap="rectangular"
    >
      <div className={classes.avatarContainer}>
        {avatar ? (
          <img className={classes.avatar} src={avatar} alt="User Avatar" />
        ) : (
          <DefaultAvatar />
        )}
      </div>
    </Badge>
  )
}

export default UserAvatar
