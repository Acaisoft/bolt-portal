import React from 'react'

import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core'

function CheckboxField({
  label,
  input,
  meta: { error, ...otherMeta },
  helperText,
  disabled,
  ...other
}) {
  const description = error || helperText

  return (
    <FormControl disabled={disabled} error={error}>
      <FormControlLabel
        control={<Checkbox {...input} value={input.name} checked={input.checked} />}
        label={label}
      />
      {description && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CheckboxField
