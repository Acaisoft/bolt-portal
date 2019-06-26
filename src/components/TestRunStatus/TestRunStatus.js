import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography, CircularProgress } from '@material-ui/core'
import { Close, Done, ArrowRightAlt, ErrorOutline } from '@material-ui/icons'

import { TestRunStatus as Status } from '~config/constants'
import { Monitor, Terminate } from '~assets/icons'

import useStyles from './TestRunStatus.style'

export const configurations = {
  [Status.PENDING]: {
    icon: props => <CircularProgress size={13} {...props} />,
    name: Status.PENDING,
    title: 'In progress',
  },
  [Status.RUNNING]: {
    icon: props => <ArrowRightAlt {...props} />,
    name: Status.RUNNING,
    title: 'Running',
  },
  [Status.FINISHED]: {
    icon: props => <Done {...props} />,
    name: Status.FINISHED,
    title: 'Finished',
  },
  [Status.TERMINATED]: {
    icon: props => <Terminate {...props} />,
    name: Status.TERMINATED,
    title: 'Terminated',
  },
  [Status.ERROR]: {
    icon: props => <Close {...props} />,
    name: Status.ERROR,
    title: 'Error',
  },
  [Status.FAILED]: {
    icon: props => <Close {...props} />,
    name: Status.FAILED,
    title: 'Failed',
  },
  [Status.MONITORING]: {
    icon: props => <Monitor {...props} />,
    name: Status.MONITORING,
    title: 'Monitoring',
  },
  [Status.UNKNOWN]: {
    icon: props => <ErrorOutline {...props} />,
    name: Status.UNKNOWN,
    title: 'Unknown',
  },
}

export function TestRunStatus({ status }) {
  const validatedStatus = configurations[status] ? status : Status.UNKNOWN
  const validConfiguration = configurations[validatedStatus]
  const classes = useStyles()

  const { icon: Icon, name, title } = validConfiguration
  return (
    <div className={classes.wrapper}>
      <div
        className={classNames(classes.root, classes[name])}
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
