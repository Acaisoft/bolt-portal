import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExtensionIcon from '@material-ui/icons/Extension'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

import styles from './Sidebar.styles'

export class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  items = [
    { label: 'Dashboard', linkTo: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Projects', linkTo: '/projects', icon: <ExtensionIcon /> },
    { label: 'Tests Results', linkTo: '/tests-results', icon: <ShowChartIcon /> },
  ]

  render() {
    const { classes } = this.props

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.text}>
          <div className={classes.intro}>
            <Avatar>A</Avatar>
            <Typography
              variant="subtitle1"
              color="inherit"
              gutterBottom
              className={classes.introText}
            >
              HELLO, Admin!
            </Typography>
          </div>
          <p>Another great day, for testing your apps!</p>
        </div>
        <List>
          {this.items.map(({ label, linkTo, icon }) => (
            <ListItem
              button
              key={linkTo}
              component={Link}
              to={linkTo}
              color="inherit"
              className={classes.listItem}
            >
              <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body2"
                    style={{
                      color: '#E8E8E8',
                      fontSize: '1.25rem',
                      textTransform: 'uppercase',
                      fontWeight: 'normal',
                    }}
                  >
                    {label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem button color="inherit" className={classes.listItem}>
            <ListItemIcon className={classes.itemIcon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  type="body2"
                  style={{
                    color: '#E8E8E8',
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    fontWeight: 'normal',
                  }}
                >
                  log out
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withRouter(withStyles(styles)(Sidebar))
