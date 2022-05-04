import React from 'react'
import { SvgIcon } from '@material-ui/core'

function UploadImage(props) {
  return (
    <SvgIcon
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="uploadImageIcon"
      {...props}
    >
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="11.5"
        rx="1.25"
        fill="none"
        stroke="#BFBFE8"
        strokeWidth="1.5"
      />
      <path d="M1 4.5H17.5" stroke="#BFBFE8" strokeWidth="1.5" />
      <path d="M5 4.5V12" stroke="#BFBFE8" strokeWidth="1.5" />
    </SvgIcon>
  )
}

export default UploadImage
