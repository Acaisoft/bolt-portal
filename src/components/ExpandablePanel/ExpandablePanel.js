import React from 'react'
import PropTypes from 'prop-types'

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import useStyles from './ExpandablePanel.styles'

export function ExpandablePanel({ children, title, ...panelProps }) {
  const classes = useStyles()

  return (
    <ExpansionPanel
      data-testid="expansion-panel"
      className={classes.root}
      elevation={0}
      {...panelProps}
    >
      <ExpansionPanelSummary
        data-testid="expansion-panel-summary"
        expandIcon={<ExpandMore />}
        classes={{
          root: classes.summary,
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
  title: PropTypes.string,
}

export default ExpandablePanel
