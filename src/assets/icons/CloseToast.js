import React from 'react'

import { SvgIcon } from '@material-ui/core'

function CloseToast(props) {
  return (
    <SvgIcon
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      data-testid="closeToastIcon"
      {...props}
    >
      <path
        d="M9.94971 3L2.99996 9.94974"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M9.94971 9.94971L2.99996 2.99996"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </SvgIcon>
  )
}

export default CloseToast
