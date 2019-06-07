import React from 'react'
import PropTypes from 'prop-types'

import { FormControl, FormHelperText } from '@material-ui/core'
import { Button } from '~components'
import { UploadImage } from '~assets/icons'

import useStyles from './FileUploader.component.styles'

function FileUploader({ accept, error, id, label, loading, onChange }) {
  const classes = useStyles()

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
        <Button variant="outlined" color="default" component="span" icon={UploadImage} className={classes.button}>
          {label}
        </Button>
      </label>
      {loading && <p>Loading: {loading}</p>}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FileUploader
