import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, Typography, Grid } from '@material-ui/core'
import { PlayArrow, CalendarToday, Edit } from '@material-ui/icons'

import styles from './ConfigurationActions.styles'

export const ConfigurationActions = ({ classes, onPlay, onChange, onEdit }) => (
  <Grid container justify="center" alignItems="center">
    <Button
      classes={{
        root: classes.actionButton,
        label: classes.actionButtonLabel,
      }}
      variant="contained"
      onClick={onPlay}
    >
      <PlayArrow />
      <Typography variant="body2">Play</Typography>
    </Button>
    <Button
      classes={{
        root: classes.actionButton,
        label: classes.actionButtonLabel,
      }}
      variant="contained"
      onClick={onChange}
    >
      <CalendarToday />
      <Typography variant="body2">Change</Typography>
    </Button>
    <Button
      classes={{
        root: classes.actionButton,
        label: classes.actionButtonLabel,
      }}
      variant="contained"
      onClick={onEdit}
    >
      <Edit />
      <Typography variant="body2">Edit</Typography>
    </Button>
  </Grid>
)

ConfigurationActions.propTypes = {
  classes: PropTypes.object,
  onPlay: PropTypes.func,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
}

ConfigurationActions.defaultProps = {
  onPlay: () => {},
  onChange: () => {},
  onEdit: () => {},
}

export default withStyles(styles)(ConfigurationActions)
