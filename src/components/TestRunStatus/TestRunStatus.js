import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography, CircularProgress } from '@material-ui/core'
import { Close, Done } from '@material-ui/icons'

import { TestRunStatus as Status } from '~config/constants'

import useStyles from './TestRunStatus.style'

export const configurations = {
  [Status.PENDING]: {
    icon: props => <CircularProgress size={13} {...props} />,
    name: Status.PENDING,
    title: 'In progress',
  },
  [Status.FINISHED]: {
    icon: props => <Done {...props} />,
    name: Status.FINISHED,
    title: 'Finished',
  },
  [Status.ERROR]: {
    icon: props => <Close {...props} />,
    name: Status.ERROR,
    title: 'Error',
  },
}

export function TestRunStatus({ status }) {
  const validatedStatus = configurations[status] ? status : Status.ERROR
  const validConfiguration = configurations[validatedStatus]
  const classes = useStyles()

  const { icon: Icon, name, title } = validConfiguration
  return (
    <div className={classes.wrapper}>
      <div
        className={classNames(classes.root, classes[validatedStatus])}
        data-testid="test-run-status-wrapper"
      >
        <Icon data-testid="test-run-status-icon" className={classes.icon} />
        <Typography className={classes.title} variant="body1">
          {title}
        </Typography>
      </div>
    </div>
  )
}

TestRunStatus.propTypes = {
  status: PropTypes.string,
}

export default TestRunStatus
