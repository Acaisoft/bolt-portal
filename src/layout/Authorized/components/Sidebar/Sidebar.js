import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Dashboard, Extension, ExitToApp, ShowChart } from '@material-ui/icons'

import styles from './Sidebar.styles'

export class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  items = [
    { label: 'Dashboard', linkTo: '/dashboard', icon: <Dashboard /> },
    { label: 'Projects', linkTo: '/projects', icon: <Extension /> },
    { label: 'Tests Results', linkTo: '/tests-results', icon: <ShowChart /> },
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
              <ExitToApp />
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
