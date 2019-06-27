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
import { LoadingPlaceholder, ErrorPlaceholder } from '~components'

const Stages = {
  PRE_START: 'pre_start',
  ARGO_PREPARATION: 'argo_preparation',
  PREPARATION: 'argo_pre_start',
  MONITORING: 'argo_monitoring',
  LOAD_TESTS: 'argo_load_tests',
  CLEAN_UP: 'argo_post_stop',
}
function getCurrentStatus(data) {
  const stagesData = {
    preparation: data.find(log => log.stage === Stages.PREPARATION),
    monitoring: data.find(log => log.stage === Stages.MONITORING),
    load: data.find(log => log.stage === Stages.LOAD_TESTS),
    cleanup: data.find(log => log.stage === Stages.CLEAN_UP),
  }

  return stagesData
}

function getCurrentMessages(data, config) {
  let stagesMessagesData = {
    preparation: data.filter(log => log.stage === Stages.ARGO_PREPARATION),
    monitoring: data.filter(log => log.stage === Stages.MONITORING),
    load: data.filter(log => log.stage === Stages.LOAD_TESTS),
    cleanup: data.filter(log => log.stage === Stages.CLEAN_UP),
  }

  if (config.has_pre_test && stagesMessagesData) {
    const preStart = data.filter(log => log.stage === Stages.PRE_START)

    stagesMessagesData.preparation = stagesMessagesData.preparation.concat(preStart)

    stagesMessagesData.preparation.sort(function(a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp)
    })
  }

  return stagesMessagesData
}

function calculateNumberOfColumns(config) {
  let numberOfColumns = 2

  Object.keys(config).forEach(step => {
    if (config[step] && step !== 'has_pre_test') {
      numberOfColumns++
    }
  })

  numberOfColumns =
    config.has_load_tests & config.has_monitoring
      ? numberOfColumns - 1
      : numberOfColumns

  return numberOfColumns
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

  const numberOfColumns = calculateNumberOfColumns(config)

  const [preparationEl, preparationRef] = useCallbackRef()
  const [monitoringEl, monitoringRef] = useCallbackRef()
  const [loadTestsEl, loadTestsRef] = useCallbackRef()
  const [cleanupEl, cleanupRef] = useCallbackRef()
  const [finishEl, finishRef] = useCallbackRef()

  let stagesData = {}
  let stagesMessagesData = {}

  let isFinished = false

  if (execution_stage_log && executionStatus !== 'TERMINATED') {
    stagesData = getCurrentStatus(execution_stage_log)
    stagesMessagesData = getCurrentMessages(execution_stage_log, config)

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

    if (!config.has_pre_start) {
      if (executionStatus === TestRunStageStatus.PENDING && !stagesData.load) {
        stagesData.preparation = {
          msg: TestRunStageStatus.RUNNING,
        }
      } else if (stagesData.load) {
        stagesData.preparation = {
          msg: TestRunStageStatus.SUCCEEDED,
        }
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
          <Grid container>
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
                  stepMessages={stagesMessagesData.preparation}
                />
              </Grid>
            </Grid>

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
                      stepMessages={stagesMessagesData.monitoring}
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
                      stepMessages={stagesMessagesData.load}
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
                    stepMessages={stagesMessagesData.cleanup}
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
