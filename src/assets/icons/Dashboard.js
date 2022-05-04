import React from 'react'

import { SvgIcon } from '@material-ui/core'

function Dashboard(props) {
  return (
    <SvgIcon viewBox="0 0 18 15" {...props} data-testid="dashboardIcon">
      <path
        d="M3 1.5V14H17M3 1.5L1 4M3 1.5L5 4M6.5 10L9 7L13 9L16 4"
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  )
}

export default Dashboard
