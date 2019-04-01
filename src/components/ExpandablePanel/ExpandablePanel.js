import React from 'react'
import PropTypes from 'prop-types'

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  withStyles,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import styles from './ExpandablePanel.styles'

function ExpandablePanel({ children, classes, title, ...panelProps }) {
  return (
    <ExpansionPanel className={classes.root} elevation={0} {...panelProps}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        classes={{
          content: classes.summaryContent,
          expandIcon: classes.expandIcon,
        }}
      >
        <Typography variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

ExpandablePanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default withStyles(styles)(ExpandablePanel)
