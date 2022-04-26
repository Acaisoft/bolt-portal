import React from 'react'
import { useParams } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { Box, Grid } from '@material-ui/core'
import {
  LoadingPlaceholder,
  ErrorPlaceholder,
  NotFoundPlaceholder,
  SectionHeader,
} from 'components'
import { TestDetails } from './components'
import { SUBSCRIBE_TO_EXECUTION_DETAILS } from './graphql'
import useStyles from './TestsCompare.styles'

function TestsCompare() {
  const classes = useStyles()
  const { compareIdFirst, compareIdSecond } = useParams()

  const {
    data: { execution } = {},
    loading,
    error,
  } = useSubscription(SUBSCRIBE_TO_EXECUTION_DETAILS, {
    variables: {
      executionId: compareIdFirst,
    },
    fetchPolicy: 'cache-and-network',
  })

  const {
    data: { execution: compareExecution } = {},
    loading: compareLoading,
    error: compareError,
  } = useSubscription(SUBSCRIBE_TO_EXECUTION_DETAILS, {
    variables: {
      executionId: compareIdSecond,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (
    loading ||
    compareLoading ||
    error ||
    compareError ||
    !execution ||
    !compareExecution
  ) {
    return (
      <Box p={3}>
        {loading || compareLoading ? (
          <LoadingPlaceholder title="Loading data to compare..." />
        ) : error || compareError ? (
          <ErrorPlaceholder error={error || compareError} />
        ) : (
          <NotFoundPlaceholder title="Sufficient compare data not found" />
        )}
      </Box>
    )
  }

  return (
    <>
      <SectionHeader
        className={classes.title}
        size="large"
        title="Test Runs Comparison"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <TestDetails titleStart="Test no. 1: " execution={execution} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TestDetails titleStart="Test no. 2: " execution={compareExecution} />
        </Grid>
      </Grid>
    </>
  )
}

export default TestsCompare
