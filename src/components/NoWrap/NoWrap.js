import React from 'react'

function NoWrap({ children, ...spanProps }) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} {...spanProps}>
      {children}
    </span>
  )
}

export default NoWrap
