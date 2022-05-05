import React from 'react'
import PropTypes from 'prop-types'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import useStyles from './ExpandablePanel.styles'

export function ExpandablePanel({ children, title, ...panelProps }) {
  const classes = useStyles()

  return (
    <Accordion
      aria-label={`${title} panel`}
      data-testid="expansion-panel"
      className={classes.root}
      elevation={0}
      {...panelProps}
    >
      <AccordionSummary
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
      </AccordionSummary>
      <AccordionDetails className={classes.details}>{children}</AccordionDetails>
    </Accordion>
  )
}

ExpandablePanel.propTypes = {
  title: PropTypes.string,
}

export default ExpandablePanel
