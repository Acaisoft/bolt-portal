import { useMemo } from 'react'
import { max, mean, min, sum } from 'lodash'

export function useEndpointSummary(data) {
  const summary = useMemo(
    () => ({
      requests: sum(data.map(x => +x.num_requests)),
      successes: sum(data.map(x => +x.num_successes)),
      failures: sum(data.map(x => +x.num_failures)),
      requestsPerSecond: sum(
        data.map(x =>
          +x.requests_per_second < 1 && x.requests_per_second > 0
            ? 1
            : x.requests_per_second
        )
      ),
      minResponseTime: min(data.map(x => +x.min_response_time)),
      averageResponseTime: mean(data.map(x => +x.average_response_time)),
      maxResponseTime: max(data.map(x => +x.max_response_time)),
    }),
    [data]
  )

  return summary
}
