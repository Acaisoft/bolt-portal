import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link, matchPath } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

import routes from '~config/routes'
import { useMenu } from '~hooks'
import { Hamburger } from '~assets/icons'

import useStyles from './TopBar.styles'
import NavBreadcrumbs from '../NavBreadcrumbs'
import SideMenu from '../SideMenu'
import UserMenu from '../UserMenu'
import { Button } from '~components'
import logo from '~assets/images/bolt-logo.png'

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
            <Button
              className={classes.menuButton}
              variant="contained"
              color="primary"
              size="small"
              icon={Hamburger}
              edge="start"
              onClick={handleMenuOpen}
              aria-owns={isMenuOpen ? 'project-menu' : undefined}
              aria-haspopup="true"
            />
          )}

          <Link to="/" className={classes.title}>
            <img src={logo} alt="logo" className={classes.logo} />
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
