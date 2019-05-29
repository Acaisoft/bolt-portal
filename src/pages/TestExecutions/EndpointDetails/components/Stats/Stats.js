import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import filesize from 'filesize'

import { Grid, Paper } from '@material-ui/core'
import { NoDataPlaceholder, SectionHeader, LabeledValue } from '~components'

import { formatThousands } from '~utils/numbers'

import { GET_ENDPOINT_TOTALS } from './graphql'

function Stats({ classes, endpointId }) {
  const { endpointTotals, loading } = useEndpointTotals(endpointId)

  if (loading) {
    return (
      <Paper square className={classes.tile}>
        <NoDataPlaceholder label="Loading stats..." height="100%" />
      </Paper>
    )
  }

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.verticalGridItem}>
        <Paper square className={classes.tile}>
          <SectionHeader title="Response Times" size="small" />
          <div className={classes.tileContent}>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <LabeledValue
                  label="Minimal"
                  value={`${formatThousands(endpointTotals.min_response_time)} ms`}
                />
              </Grid>
              <Grid item xs={4}>
                <LabeledValue
                  label="Average"
                  value={`${formatThousands(
                    endpointTotals.average_response_time
                  )} ms`}
                />
              </Grid>
              <Grid item xs={4}>
                <LabeledValue
                  label="Maximal"
                  value={`${formatThousands(endpointTotals.max_response_time)} ms`}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.verticalGridItem}>
        <Paper square className={classes.tile}>
          <SectionHeader title="Response Size" size="small" />

          <div className={classes.tileContent}>
            <Grid container spacing={32}>
              <Grid item xs={4}>
                <LabeledValue
                  label="Minimal"
                  value={filesize(endpointTotals.min_content_size || 0, {
                    round: 0,
                  })}
                />
              </Grid>
              <Grid item xs={4}>
                <LabeledValue
                  label="Average"
                  value={filesize(endpointTotals.average_content_size || 0, {
                    round: 0,
                  })}
                />
              </Grid>
              <Grid item xs={4}>
                <LabeledValue
                  label="Maximal"
                  value={filesize(endpointTotals.max_content_size || 0, {
                    round: 0,
                  })}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

function useEndpointTotals(endpointId) {
  const {
    loading,
    data: { endpointTotals = [] },
  } = useQuery(GET_ENDPOINT_TOTALS, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return { loading, endpointTotals: endpointTotals[0] || {} }
}

export default Stats
