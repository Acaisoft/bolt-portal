import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'

import useStyles from './Breadcrumbs.styles'

export function Breadcrumbs({ items = [] }) {
  const classes = useStyles()

  if (items.length === 0) {
    return null
  }

  return (
    <div className={classes.root} data-testid="Breadcrumbs">
      {items.map(({ url, label, render, key = url }, index) => (
        <React.Fragment key={key}>
          {render ? (
            render({ index })
          ) : url ? (
            <Link
              data-testid="link"
              component={RouterLink}
              color="inherit"
              to={url}
              className={classes.linkItem}
            >
              {label}
            </Link>
          ) : (
            <div data-testid="item" className={classes.textItem}>
              {label}
            </div>
          )}
          {index < items.length - 1 && (
            <ChevronRight className={classes.separator} data-testid="separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumbs
