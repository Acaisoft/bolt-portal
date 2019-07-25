import React from 'react'

import useStyles from './StatusGraph.styles'

import classNames from 'classnames'
import { TestRunStageStatus } from '~config/constants'

function Step({ stepName, stepData }, ref) {
  const classes = useStyles()

  const isActive = stepData && stepData !== TestRunStageStatus.NOT_STARTED

  return (
    <div className={classes.step}>
      <div
        className={classNames(
          classes.circle,
          isActive && classes.active,
          classes[stepData]
        )}
        ref={ref}
      />
      <div className={classes.stepTitle}>{stepName}</div>
    </div>
  )
}

export default React.forwardRef(Step)
