import React from 'react'

import useStyles from './StatusGraph.styles'

import classNames from 'classnames'

function Step({ stepName, stepData }, ref) {
  const classes = useStyles()

  return (
    <div className={classes.step}>
      <div
        className={classNames(
          classes.circle,
          stepData.status && classes.active,
          classes[stepData.status]
        )}
        ref={ref}
      />
      <div className={classes.stepTitle}>
        {/* <StatusIcon status={stepData.status} /> */}
        {stepName}
      </div>
    </div>
  )
}

export default React.forwardRef(Step)
