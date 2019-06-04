import React from 'react'
import { SvgIcon } from '@material-ui/core'

function Monitor(props) {
  return (
    <SvgIcon width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <mask id="path-1-inside-1" fill="currentColor">
        <rect width="12" height="9" rx="1" fill="white" />
      </mask>
      <rect
        width="12"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="4"
        mask="url(#path-1-inside-1)"
        fill="none"
      />
      <path
        d="M6 8V11H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 8V11H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  )
}

export default Monitor
