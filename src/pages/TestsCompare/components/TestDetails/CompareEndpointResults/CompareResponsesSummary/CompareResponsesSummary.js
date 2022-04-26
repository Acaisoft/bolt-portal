import React from 'react'
import { Grid } from '@material-ui/core'
import { formatThousands, formatPercent } from 'utils/numbers'
import { useEndpointSummary } from 'hooks'
import { LabeledValue, NoWrap, SectionHeader } from 'components'

function CompareResponsesSummary({ data }) {
  const {
    successes,
    requests,
    failures,
    requestsPerSecond,
    minResponseTime,
    averageResponseTime,
    maxResponseTime,
  } = useEndpointSummary(data)

  return (
    <>
      <SectionHeader title="Summary" size="small" marginBottom />
      <Grid container spacing={5} alignItems="flex-start">
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Total requests" value={formatThousands(requests)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue
            label="Success"
            value={
              <NoWrap>
                {formatPercent(successes / requests)} ({formatThousands(successes)})
              </NoWrap>
            }
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue
            label="Fail"
            value={
              <NoWrap>
                {formatPercent(failures / requests)} ({formatThousands(failures)})
              </NoWrap>
            }
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledValue label="Req/s" value={formatThousands(requestsPerSecond)} />
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
            value={
              <NoWrap>
                {formatThousands(minResponseTime)} /{' '}
                {formatThousands(averageResponseTime)} /{' '}
                {formatThousands(maxResponseTime)}
              </NoWrap>
            }
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CompareResponsesSummary
