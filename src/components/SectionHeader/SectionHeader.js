import React from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'

import styles from './SectionHeader.styles'

function SectionHeader({ classes, subtitle, title }) {
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title} inline>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h3" className={classes.subtitle} inline>
          {subtitle}
        </Typography>
      )}
    </div>
  )
}
SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default withStyles(styles)(SectionHeader)
