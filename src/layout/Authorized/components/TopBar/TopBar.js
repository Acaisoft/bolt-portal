import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter, NavLink, Link, matchPath } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  withStyles,
  Paper,
  MenuList,
  ClickAwayListener,
  Backdrop,
} from '@material-ui/core'
import { Menu as Hamburger, Close } from '@material-ui/icons'
import { Dashboard, TestConfiguration, TestRun, TestSource } from '~assets/icons'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import styles from './TopBar.styles'
import ProjectSelector from '../ProjectSelector'
import NavBreadcrumbs from '../NavBreadcrumbs'

export class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    anchorEl: null,
  }

  getProjectId = () => {
    const { location } = this.props

    const match = matchPath(location.pathname, {
      path: '/projects/:projectId?',
      exact: false,
    })

    return match && match.params.projectId
  }

  getMenuItems = projectId => {
    const items = [
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

    return items
  }

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenuItemClick = item => {
    const { history } = this.props

    this.handleMenuClose()
    history.push(item.linkTo)
  }

  handleProjectChange = newId => {
    const { history } = this.props

    const url = newId
      ? getUrl(routes.projects.details, { projectId: newId })
      : getUrl(routes.projects.list)

    history.push(url)
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const projectId = this.getProjectId()

    const isMenuOpen = !!anchorEl

    return (
      <div className={classes.root}>
        <AppBar position="sticky" elevation={0}>
          <Toolbar className={classes.appBar}>
            {projectId && (
              <IconButton
                className={classes.menuButton}
                onClick={this.handleMenuOpen}
                aria-owns={isMenuOpen ? 'project-menu' : undefined}
                aria-haspopup="true"
              >
                <Hamburger />
              </IconButton>
            )}

            <Link to="/" className={classes.title}>
              <Typography variant="h6" noWrap color="inherit">
                Acai Bolt
              </Typography>
            </Link>

            <div className={classes.projectSelector}>
              {/* <ProjectSelector
                projectId={projectId}
                onChange={this.handleProjectChange}
              /> */}
              <NavBreadcrumbs />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop} />
          </Toolbar>
        </AppBar>
        {isMenuOpen && (
          <div className={classes.menu} id="project-menu">
            <Backdrop open={isMenuOpen} />
            <ClickAwayListener onClickAway={this.handleMenuClose}>
              <Paper className={classes.menuPaper}>
                <div className={classes.menuHeader}>
                  <IconButton
                    className={classes.menuButton}
                    onClick={this.handleMenuClose}
                  >
                    <Close />
                  </IconButton>
                  <Typography variant="h1" className={classes.menuTitle}>
                    Acai Bolt
                  </Typography>
                </div>
                <MenuList component="div">
                  {this.getMenuItems(projectId).map(item => (
                    <MenuItem
                      component={NavLink}
                      to={item.linkTo}
                      exact={item.exact}
                      activeClassName={classes.menuItemSelected}
                      className={classes.menuItem}
                      key={item.linkTo}
                      onClick={() => this.handleMenuItemClick(item)}
                    >
                      <item.icon className={classes.menuIcon} fontSize="inherit" />
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </ClickAwayListener>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(TopBar))
