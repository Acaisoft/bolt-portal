import React, { useMemo } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { Line } from '~components'
import { useCallbackRef } from '~hooks'
import { TestRunStageStatus } from '~config/constants'
import {
  SUBSCRIBE_TO_EXECUTION_STATUS,
  GET_GRAPH_CONFIGURATION,
} from '../../graphql'

import Step from './Step'
import useStyles from './StatusGraph.styles'
import { useSubscription, useQuery } from 'react-apollo-hooks'
import { LoadingPlaceholder, ErrorPlaceholder } from '~components'

const Stages = {
  START: 'start',
  DOWNLOADING_SOURCE: 'downloading_source',
  IMAGE_PREPARATION: 'image_preparation',
  PRE_START: 'pre_start',
  LOAD_TESTS: 'load_tests',
  MONITORING: 'monitoring',
  CLEAN_UP: 'post_stop',
  FINISHED: 'finished',
}

function getCurrentStatus(data, config) {
  const stagesOrder = [
    Stages.DOWNLOADING_SOURCE,
    Stages.IMAGE_PREPARATION,
    Stages.PRE_START,
    Stages.LOAD_TESTS,
    Stages.MONITORING,
    Stages.CLEAN_UP,
  ]

  let stagesData = {}
  stagesOrder.forEach((stage, index) => {
    stagesData[stage] = {
      status: data.find(log => log.stage === stage)
        ? data.find(log => log.stage === stage).msg.toUpperCase()
        : null,
    }
  })

  if (!config.has_load_tests) {
    delete stagesData[Stages.LOAD_TESTS]
  }

  if (!config.has_monitoring) {
    delete stagesData[Stages.MONITORING]
  }

  if (!config.has_post_test) {
    delete stagesData[Stages.CLEAN_UP]
  }

  if (!config.has_pre_start) {
    delete stagesData[Stages.PRE_START]
  }

  return stagesData
}

function getFinishStepStatus(stagesData, executionStatus) {
  const isFinished = Object.values(stagesData).every(
    value =>
      value &&
      value.status &&
      value.status !== TestRunStageStatus.RUNNING &&
      value.status !== TestRunStageStatus.PENDING &&
      value.status !== TestRunStageStatus.FAILED &&
      value.status !== TestRunStageStatus.ERROR
  )

  if (executionStatus === TestRunStageStatus.TERMINATED) {
    return {
      status: TestRunStageStatus.TERMINATED,
    }
  }

  if (
    Object.values(stagesData).find(
      value =>
        value.status === TestRunStageStatus.FAILED ||
        value.status === TestRunStageStatus.ERROR
    )
  ) {
    return {
      status: TestRunStageStatus.FAILED,
    }
  }

  if (isFinished) {
    return {
      status: TestRunStageStatus.SUCCEEDED,
    }
  }

  return {
    status: null,
  }
}

export function StatusGraph({ executionId, configurationId, executionStatus }) {
  const classes = useStyles()
  const theme = useTheme()

  const {
    data: { configuration },
  } = useQuery(GET_GRAPH_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-first',
  })

  const { data: { execution_stage_log } = {}, loading, error } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_STATUS,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )
  const { id, __typename, ...config } = configuration

  const [startEl, startRef] = useCallbackRef()
  const [sourceEl, sourceRef] = useCallbackRef()
  const [preparationEl, preparationRef] = useCallbackRef()
  const [monitoringEl, monitoringRef] = useCallbackRef()
  const [loadTestsEl, loadTestsRef] = useCallbackRef()
  const [cleanupEl, cleanupRef] = useCallbackRef()
  const [finishEl, finishRef] = useCallbackRef()

  let stagesData = {}
  let isStarted = {
    status: false,
  }

  if (executionStatus === TestRunStageStatus.PENDING) {
    isStarted.status = true
  }

  if (execution_stage_log) {
    isStarted.status = true
    stagesData = getCurrentStatus(execution_stage_log, config)
    stagesData[Stages.FINISHED] = getFinishStepStatus(stagesData, executionStatus)

    if (!config.has_post_test) {
      stagesData[Stages.CLEAN_UP] = {
        status: null,
      }
      if (stagesData[Stages.FINISHED] && stagesData[Stages.FINISHED].status) {
        stagesData[Stages.CLEAN_UP].status = TestRunStageStatus.SUCCEEDED
      }
    }

    if (
      isStarted &&
      stagesData[Stages.DOWNLOADING_SOURCE] &&
      !stagesData[Stages.DOWNLOADING_SOURCE].status
    ) {
      stagesData[Stages.DOWNLOADING_SOURCE].status = TestRunStageStatus.RUNNING
    }

    if (
      stagesData[Stages.IMAGE_PREPARATION] &&
      stagesData[Stages.IMAGE_PREPARATION].status === TestRunStageStatus.SUCCEEDED
    ) {
      if (stagesData[Stages.LOAD_TESTS] && !stagesData[Stages.LOAD_TESTS].status) {
        stagesData[Stages.LOAD_TESTS].status = TestRunStageStatus.RUNNING
      }

      if (stagesData[Stages.MONITORING] && !stagesData[Stages.MONITORING].status) {
        stagesData[Stages.MONITORING].status = TestRunStageStatus.RUNNING
      }
    }
  }

  const options = useMemo(() => {
    const { line } = theme.palette.chart.graph

    return {
      [TestRunStageStatus.NOT_STARTED]: {
        color: line.default,
        size: 1,
      },
      [TestRunStageStatus.PENDING]: {
        color: line.pending,
        size: 2,
        dash: {
          animation: true,
        },
      },
      [TestRunStageStatus.RUNNING]: {
        color: line.pending,
        size: 2,
        dash: {
          animation: true,
        },
      },
      [TestRunStageStatus.SUCCEEDED]: {
        color: line.completed,
        size: 2,
      },
      [TestRunStageStatus.FAILED]: {
        color: line.failed,
        size: 2,
      },
      [TestRunStageStatus.ERROR]: {
        color: line.failed,
        size: 2,
      },
    }
  }, [theme])

  let lines = []

  lines = [
    {
      id: 1,
      from: startEl,
      to: sourceEl,
      options: isStarted.status
        ? options[TestRunStageStatus.SUCCEEDED]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 2,
      from: sourceEl,
      to: preparationEl,
      options: stagesData[Stages.DOWNLOADING_SOURCE]
        ? options[stagesData[Stages.DOWNLOADING_SOURCE].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 3,
      from: preparationEl,
      to: monitoringEl,
      options: stagesData[Stages.IMAGE_PREPARATION]
        ? options[stagesData[Stages.IMAGE_PREPARATION].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 4,
      from: preparationEl,
      to: loadTestsEl,
      options: stagesData[Stages.IMAGE_PREPARATION]
        ? options[stagesData[Stages.IMAGE_PREPARATION].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 5,
      from: monitoringEl,
      to: cleanupEl,
      options: stagesData[Stages.MONITORING]
        ? options[stagesData[Stages.MONITORING].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 6,
      from: loadTestsEl,
      to: cleanupEl,
      options: stagesData[Stages.LOAD_TESTS]
        ? options[stagesData[Stages.LOAD_TESTS].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 7,
      from: cleanupEl,
      to: finishEl,
      options: stagesData[Stages.CLEAN_UP]
        ? options[stagesData[Stages.CLEAN_UP].status]
        : options[TestRunStageStatus.NOT_STARTED],
    },
  ]

  if (loading || error) {
    return (
      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          {loading ? (
            <LoadingPlaceholder title="Loading data..." />
          ) : error ? (
            <ErrorPlaceholder error={error} />
          ) : (
            <LoadingPlaceholder title="Waiting for test run status..." />
          )}
        </Paper>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      {lines &&
        lines.map(line => (
          <Line
            key={line.id}
            fromEl={line.from}
            toEl={line.to}
            options={line.options}
          />
        ))}

      <Grid item xs={12}>
        <Paper square>
          <Grid
            container
            className={classes.container}
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item className={classes.section}>
              <Grid container justify="center" alignItems="center">
                <Step stepName="Started" ref={startRef} stepData={isStarted} />
              </Grid>
            </Grid>
            <Grid item className={classes.section}>
              <Grid container justify="center" alignItems="center">
                <Step
                  stepName="Downloading Source"
                  ref={sourceRef}
                  stepData={stagesData[Stages.DOWNLOADING_SOURCE]}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.section}>
              <Grid container justify="center" alignItems="center">
                <Step
                  stepName="Image preparation"
                  ref={preparationRef}
                  stepData={stagesData[Stages.IMAGE_PREPARATION]}
                />
              </Grid>
            </Grid>

            {(Boolean(config.has_monitoring) || Boolean(config.has_load_tests)) && (
              <Grid item className={classes.section}>
                <Grid container direction="column">
                  {Boolean(config.has_monitoring) && (
                    <Grid container justify="center" alignItems="center">
                      <Step
                        stepName="Run Monitoring"
                        ref={monitoringRef}
                        stepData={stagesData[Stages.MONITORING]}
                      />
                    </Grid>
                  )}

                  {Boolean(config.has_load_tests) && (
                    <Grid container justify="center" alignItems="center">
                      <Step
                        stepName="Run Tests"
                        ref={loadTestsRef}
                        stepData={stagesData[Stages.LOAD_TESTS]}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}

            <Grid item className={classes.section}>
              <Grid container justify="center" alignItems="center">
                <Step
                  stepName="Clean-up"
                  ref={cleanupRef}
                  stepData={stagesData[Stages.CLEAN_UP]}
                />
              </Grid>
            </Grid>

            <Grid item className={classes.section}>
              <Grid container justify="center" alignItems="center">
                <Step
                  stepName="Finished"
                  ref={finishRef}
                  stepData={stagesData[Stages.FINISHED]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

export default StatusGraph
