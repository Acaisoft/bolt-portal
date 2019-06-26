import React from 'react'

import { CircularProgress, Fade, Paper, Popover } from '@material-ui/core'
import { Done, ExpandMore, Close } from '@material-ui/icons'
import { Button } from '~components'
import { useMenu } from '~hooks'

import useStyles from './StatusGraph.styles'

function StatusIcon({ status }) {
  const classes = useStyles()

  return (
    <div className={classes.statusIcon}>
      {
        {
          PENDING: <CircularProgress size={14} />,
          RUNNING: <CircularProgress size={14} />,
          SUCCEEDED: <Done className={`${classes.icon} ${classes.success}`} />,
          FAILED: <Close className={`${classes.icon} ${classes.failed}`} />,
          ERROR: <Close className={`${classes.icon} ${classes.failed}`} />,
        }[status]
      }
    </div>
  )
}

function StepDetails({ stepName, stepData }) {
  const classes = useStyles()

  const { menuAnchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu()

  if (!stepData) {
    return <div className={classes.stepTitle}>{stepName}</div>
  }

  return (
    <React.Fragment>
      <Button onClick={handleMenuOpen} className={classes.stepTitle}>
        <StatusIcon status={stepData ? stepData.msg : null} />
        {stepName}
        <ExpandMore />
      </Button>

      <Popover
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 350 }}
      >
        <Paper className={classes.paper}>{stepData.msg}</Paper>
      </Popover>
    </React.Fragment>
  )
}

function Step({ icon: IconComponent, stepName, stepData }, ref) {
  const classes = useStyles()

  return (
    <div className={classes.step}>
      <div className={`${classes.circle} ${stepData && classes.active}`} ref={ref}>
        <IconComponent />
      </div>

      {stepName !== 'Finish' ? (
        <StepDetails stepName={stepName} stepData={stepData} />
      ) : (
        <div className={classes.stepTitle}>{stepName}</div>
      )}
    </div>
  )
}

export default React.forwardRef(Step)
