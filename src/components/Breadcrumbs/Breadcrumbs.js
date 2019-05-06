import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { withStyles, Link } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'

import styles from './Breadcrumbs.styles'

function Breadcrumbs({ classes, items = [] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      {items.map(({ url, label }, index) => (
        <React.Fragment key={url}>
          {url ? (
            <Link
              component={RouterLink}
              color="inherit"
              to={url}
              className={classes.linkItem}
            >
              {label}
            </Link>
          ) : (
            <div className={classes.textItem}>{label}</div>
          )}
          {index < items.length - 1 && (
            <div className={classes.separator}>
              <ChevronRight />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default withStyles(styles)(Breadcrumbs)
