import React, { useState, useCallback, useRef } from 'react'

import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core'
import { FileCopy, Check } from '@material-ui/icons'
import { copyValueFromInput } from '~utils/browser'

export function CopyToClipboard({ label, text, timeout = 2000, ...textFieldProps }) {
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  const handleCopy = useCallback(() => {
    const inputEl = inputRef.current
    copyValueFromInput(inputEl)
    setCopied(true)
    inputEl.focus()

    setTimeout(() => setCopied(false), timeout)
  }, [])

  const tooltipText = copied ? 'Copied!' : 'Copy to clipboard'

  return (
    <TextField
      inputRef={inputRef}
      label={label}
      value={text}
      id="copy-to-clipboard"
      InputLabelProps={{
        'data-testid': 'label',
      }}
      InputProps={{
        inputProps: {
          'data-testid': 'input',
        },
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              data-testid="tooltip"
              title={tooltipText}
              aria-label={tooltipText}
            >
              <span>
                {copied ? (
                  <IconButton data-testid="copied-button" disabled>
                    <Check data-testid="check-icon" />
                  </IconButton>
                ) : (
                  <IconButton
                    data-testid="copy-button"
                    aria-label="Copy to clipboard"
                    onClick={handleCopy}
                  >
                    <FileCopy data-testid="copy-icon" />
                  </IconButton>
                )}
              </span>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
    />
  )
}

export default CopyToClipboard
