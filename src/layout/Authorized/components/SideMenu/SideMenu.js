import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import {
  ClickAwayListener,
  Paper,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Backdrop,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Dashboard, TestRun, TestConfiguration, TestSource } from '~assets/icons'

import routes from '~config/routes'
import { getUrl } from '~utils/router'

import useStyles from './SideMenu.styles'

function SideMenu({ isOpen, onClose, projectId }) {
  const classes = useStyles()

  const items = useMemo(() => {
    if (!projectId) {
      return []
    }

    return [
      {
        label: 'Dashboard',
        linkTo: getUrl(routes.projects.list),
        icon: Dashboard,
        exact: true,
      },
      {
        label: 'Test Runs',
        linkTo: getUrl(routes.projects.executions.list, { projectId }),
        icon: TestRun,
        exact: false,
      },
      {
        label: 'Test Scenarios',
        linkTo: getUrl(routes.projects.configurations.list, { projectId }),
        icon: TestConfiguration,
        exact: false,
      },
      {
        label: 'Test Sources',
        linkTo: getUrl(routes.projects.sources.list, { projectId }),
        icon: TestSource,
        exact: false,
      },
    ]
  }, [projectId])

  if (!isOpen) {
    return null
  }

  return (
    <div className={classes.root} id="project-menu">
      <Backdrop open={isOpen} />
      <ClickAwayListener onClickAway={onClose}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <IconButton className={classes.button} onClick={onClose}>
              <Close />
            </IconButton>
            <Typography variant="h1" className={classes.title}>
              Acai Bolt
            </Typography>
          </div>
          <MenuList component="div" className={classes.menu}>
            {items.map(item => (
              <MenuItem
                key={item.linkTo}
                component={NavLink}
                to={item.linkTo}
                exact={item.exact}
                activeClassName={classes.itemSelected}
                className={classes.item}
                onClick={onClose}
              >
                <item.icon className={classes.icon} fontSize="inherit" />
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </ClickAwayListener>
    </div>
  )
}
SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SideMenu
