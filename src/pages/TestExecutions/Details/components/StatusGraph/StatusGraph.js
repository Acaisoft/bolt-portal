import React, { useMemo } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { Line } from '~components'
import {
  PreparationIcon,
  MonitoringIcon,
  TestsIcon,
  CleanupIcon,
  FinishIcon,
} from '~assets/icons'
import { useCallbackRef } from '~hooks'
import { TestRunStageStatus } from '~config/constants'
import {
  SUBSCRIBE_TO_EXECUTION_STATUS,
  GET_GRAPH_CONFIGURATION,
} from '../../graphql'

import Step from './Step'
import useStyles from './StatusGraph.styles'
import { useSubscription, useQuery } from 'react-apollo-hooks'

export function StatusGraph({ executionId, configurationId }) {
  const classes = useStyles()
  const theme = useTheme()

  const Stages = {
    PREPARATION: 'argo_pre_start',
    MONITORING: 'argo_monitoring',
    LOAD_TESTS: 'argo_load_tests',
    CLEAN_UP: 'argo_post_stop',
  }

  const {
    data: { configuration },
  } = useQuery(GET_GRAPH_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-first',
  })

  const { id, __typename, ...config } = configuration

  const { data: { execution_stage_log } = {} } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_STATUS,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const [preparationEl, preparationRef] = useCallbackRef()
  const [monitoringEl, monitoringRef] = useCallbackRef()
  const [loadTestsEl, loadTestsRef] = useCallbackRef()
  const [cleanupEl, cleanupRef] = useCallbackRef()
  const [finishEl, finishRef] = useCallbackRef()

  const stagesData = {}

  let isFinished = false

  if (execution_stage_log) {
    stagesData.preparation = execution_stage_log.find(
      data => data.stage === Stages.PREPARATION
    )
    stagesData.monitoring = execution_stage_log.find(
      data => data.stage === Stages.MONITORING
    )
    stagesData.load = execution_stage_log.find(
      data => data.stage === Stages.LOAD_TESTS
    )
    stagesData.cleanup = execution_stage_log.find(
      data => data.stage === Stages.CLEAN_UP
    )

    Object.keys(stagesData).forEach(
      key => stagesData[key] == null && delete stagesData[key]
    )

    if (Object.entries(stagesData).length !== 0) {
      isFinished = Object.values(stagesData).every(
        value =>
          value &&
          value.msg !== TestRunStageStatus.RUNNING &&
          value.msg !== TestRunStageStatus.PENDING
      )
    }
  }

  const currentStages = Object.keys(config).filter(step => config[step])

  let numberOfColumns = currentStages.length + 1

  numberOfColumns =
    config.has_load_tests & config.has_monitoring
      ? numberOfColumns - 1
      : numberOfColumns

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
        color: line.completed,
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

  //TODO please create function for that

  lines = [
    {
      id: 1,
      from: preparationEl,
      to: monitoringEl,
      options: stagesData.preparation
        ? options[stagesData.preparation.msg]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 2,
      from: preparationEl,
      to: loadTestsEl,
      options: stagesData.preparation
        ? options[stagesData.preparation.msg]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 3,
      from: monitoringEl,
      to: cleanupEl,
      options: stagesData.monitoring
        ? options[stagesData.monitoring.msg]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 4,
      from: loadTestsEl,
      to: cleanupEl,
      options: stagesData.load
        ? options[stagesData.load.msg]
        : options[TestRunStageStatus.NOT_STARTED],
    },
    {
      id: 5,
      from: cleanupEl,
      to: finishEl,
      options: stagesData.cleanup
        ? options[stagesData.cleanup.msg]
        : options[TestRunStageStatus.NOT_STARTED],
    },
  ]

  if (!config.has_post_test) {
    lines = [
      {
        id: 1,
        from: preparationEl,
        to: monitoringEl,
        options: stagesData.preparation
          ? options[stagesData.preparation.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 2,
        from: preparationEl,
        to: loadTestsEl,
        options: stagesData.preparation
          ? options[stagesData.preparation.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 3,
        from: monitoringEl,
        to: finishEl,
        options: stagesData.monitoring
          ? options[stagesData.monitoring.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 4,
        from: loadTestsEl,
        to: finishEl,
        options: stagesData.load
          ? options[stagesData.load.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
    ]
  }

  if (!config.has_pre_test) {
    lines = [
      {
        id: 1,
        from: monitoringEl,
        to: cleanupEl,
        options: stagesData.monitoring
          ? options[stagesData.monitoring.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 2,
        from: loadTestsEl,
        to: cleanupEl,
        options: stagesData.load
          ? options[stagesData.load.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 3,
        from: cleanupEl,
        to: finishEl,
        options: stagesData.cleanup
          ? options[stagesData.cleanup.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
    ]
  }

  if (!config.has_pre_test && !config.has_post_test) {
    lines = [
      {
        id: 1,
        from: monitoringEl,
        to: finishEl,
        options: stagesData.monitoring
          ? options[stagesData.monitoring.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 2,
        from: loadTestsEl,
        to: finishEl,
        options: stagesData.load
          ? options[stagesData.load.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
    ]
  }

  if (!config.has_monitoring || !config.has_load_tests) {
    lines = [
      {
        id: 1,
        from: preparationEl,
        to: monitoringEl,
        options: stagesData.preparation
          ? options[stagesData.preparation.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 2,
        from: preparationEl,
        to: loadTestsEl,
        options: stagesData.preparation
          ? options[stagesData.preparation.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 3,
        from: monitoringEl,
        to: finishEl,
        options: stagesData.monitoring
          ? options[stagesData.monitoring.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
      {
        id: 4,
        from: loadTestsEl,
        to: finishEl,
        options: stagesData.load
          ? options[stagesData.load.msg]
          : options[TestRunStageStatus.NOT_STARTED],
      },
    ]
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
          <Grid container>
            {Boolean(config.has_pre_test) && (
              <Grid
                container
                item
                xs={12 / numberOfColumns}
                justify="center"
                alignItems="center"
                className={classes.section}
              >
                <Grid item>
                  <Step
                    icon={PreparationIcon}
                    stepName="Test Preparation"
                    ref={preparationRef}
                    stepData={stagesData.preparation}
                  />
                </Grid>
              </Grid>
            )}

            {(Boolean(config.has_monitoring) || Boolean(config.has_load_tests)) && (
              <Grid
                container
                item
                xs={12 / numberOfColumns}
                justify="space-around"
                alignItems="center"
                direction="column"
              >
                {Boolean(config.has_monitoring) && (
                  <Grid item>
                    <Step
                      icon={MonitoringIcon}
                      stepName="Run Monitoring"
                      ref={monitoringRef}
                      stepData={stagesData.monitoring}
                    />
                  </Grid>
                )}

                {Boolean(config.has_load_tests) && (
                  <Grid item>
                    <Step
                      icon={TestsIcon}
                      stepName="Run Tests"
                      ref={loadTestsRef}
                      stepData={stagesData.load}
                    />
                  </Grid>
                )}
              </Grid>
            )}

            {Boolean(config.has_post_test) && (
              <Grid
                container
                item
                xs={12 / numberOfColumns}
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Step
                    icon={CleanupIcon}
                    stepName="Clean-up"
                    ref={cleanupRef}
                    stepData={stagesData.cleanup}
                  />
                </Grid>
              </Grid>
            )}

            <Grid
              container
              item
              xs={12 / numberOfColumns}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Step
                  icon={FinishIcon}
                  stepName="Finish"
                  ref={finishRef}
                  stepData={isFinished}
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
