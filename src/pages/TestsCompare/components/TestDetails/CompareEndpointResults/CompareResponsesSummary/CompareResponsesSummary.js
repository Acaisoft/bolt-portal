import React from 'react'
import { Grid } from '@material-ui/core'
import { useEndpointSummary } from 'hooks'
import { LabeledValue, NoWrap, SectionHeader } from 'components'

function CompareResponsesSummary({ data }) {
  const summary = useEndpointSummary(data)

  return (
    <>
      <SectionHeader title="Summary" size="small" marginBottom />
      <Grid container spacing={5} alignItems="flex-start">
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Total requests" value={summary.requests || 0} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Success" value={summary.successes || 0} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Fail" value={summary.failures || 0} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Req/s" value={summary.requests || 0} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue
            label={
              <div>
                Response Time [ms]
                <br />
                <NoWrap>Min. / Avg. / Max.</NoWrap>
              </div>
            }
            value={`${summary.minResponseTime} / ${summary.averageResponseTime} / ${summary.maxResponseTime}`}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CompareResponsesSummary
