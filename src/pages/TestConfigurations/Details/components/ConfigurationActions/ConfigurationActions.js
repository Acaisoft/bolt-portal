import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, Typography, Grid, Tooltip } from '@material-ui/core'
import { PlayArrow, Edit, Delete } from '@material-ui/icons'

import styles from './ConfigurationActions.styles'

export const ConfigurationActions = ({
  classes,
  onRun,
  onEdit,
  onDelete,
  isPerformed,
  isRunning,
}) => (
  <Grid container justify="center" alignItems="center">
    <Button
      classes={{
        root: classes.actionButton,
        label: classes.actionButtonLabel,
      }}
      variant="contained"
      disabled={isRunning}
      onClick={onRun}
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
      onClick={onEdit}
    >
      <Edit />
      <Typography variant="body2">Edit</Typography>
    </Button>
    <Tooltip
      title={isPerformed ? "You can't delete a performed scenario." : ''}
      PopperProps={{
        classes: {
          popper: {
            opacity: 1,
          },
        },
      }}
    >
      <span>
        <Button
          aria-label="Delete scenario"
          classes={{
            root: classes.actionButton,
            label: classes.actionButtonLabel,
          }}
          variant="contained"
          disabled={isPerformed}
          onClick={onDelete}
        >
          <Delete />
          <Typography variant="body2">Delete</Typography>
        </Button>
      </span>
    </Tooltip>
  </Grid>
)

ConfigurationActions.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onRun: PropTypes.func,
}

ConfigurationActions.defaultProps = {
  onChange: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onRun: () => {},
}

export default withStyles(styles)(ConfigurationActions)
