import React from 'react'

import { Link } from 'react-router-dom'
import { MenuItem } from '@material-ui/core'

function MenuItemLink({ href, ...MenuItemProps }, ref) {
  return <MenuItem component={Link} to={href} {...MenuItemProps} innerRef={ref} />
}

export default React.forwardRef(MenuItemLink)
