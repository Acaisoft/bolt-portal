import React from 'react'
import PropTypes from 'prop-types'

import { FormControl, withStyles, FormHelperText } from '@material-ui/core'
import { Image } from '@material-ui/icons'
import { ButtonWithIcon } from '~components'

import styles from './FileUploader.component.styles'

function FileUploader({ accept, classes, error, id, label, loading, onChange }) {
  return (
    <FormControl error={!!error} margin="normal">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        id={id}
        className={classes.input}
      />
      <label htmlFor={id}>
        <ButtonWithIcon
          variant="outlined"
          color="default"
          component="span"
          icon={Image}
        >
          {label}
        </ButtonWithIcon>
      </label>
      {loading && <p>Loading: {loading}</p>}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FileUploader)
