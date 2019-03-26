import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  FormControl,
  withStyles,
  FormLabel,
  FormHelperText,
} from '@material-ui/core'

import styles from './FileUploader.component.styles'

function FileUploader({ classes, error, id, label, loading, onChange }) {
  return (
    <FormControl error={!!error} fullWidth margin="normal">
      <FormLabel className={classes.label}>{label}</FormLabel>
      <input id={id} type="file" onChange={onChange} className={classes.input} />
      <label htmlFor={id}>
        <Button variant="contained" component="span">
          Upload a file
        </Button>
      </label>
      {loading && <p>Loading: {loading}</p>}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FileUploader)
