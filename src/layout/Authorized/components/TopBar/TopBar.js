import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link, matchPath } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as Hamburger } from '@material-ui/icons'

import routes from '~config/routes'
import { useMenu } from '~hooks'

import useStyles from './TopBar.styles'
import NavBreadcrumbs from '../NavBreadcrumbs'
import SideMenu from '../SideMenu'
import UserMenu from '../UserMenu'

export function TopBar({ history, location }) {
  const classes = useStyles()
  const { handleMenuOpen, handleMenuClose, isMenuOpen } = useMenu()

  const projectId = useMemo(() => {
    const match = matchPath(location.pathname, {
      path: routes.projects.details,
      exact: false,
    })

    return match && match.params.projectId
  }, [location.pathname])

  return (
    <div className={classes.root}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar className={classes.appBar}>
          {projectId && (
            <IconButton
              className={classes.menuButton}
              onClick={handleMenuOpen}
              aria-owns={isMenuOpen ? 'project-menu' : undefined}
              aria-haspopup="true"
            >
              <Hamburger />
            </IconButton>
          )}

          <Link to="/" className={classes.title}>
            <Typography variant="h6" noWrap>
              Acai Bolt
            </Typography>
          </Link>

          <div className={classes.navBreadcrumbs}>
            <NavBreadcrumbs />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop} />
          <UserMenu />
        </Toolbar>
      </AppBar>
      <SideMenu
        isOpen={isMenuOpen}
        projectId={projectId}
        onClose={handleMenuClose}
      />
    </div>
  )
}

TopBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(TopBar)
