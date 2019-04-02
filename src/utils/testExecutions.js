import moment from 'moment'

export const getExecutionTimestampDomain = execution => {
  const estimatedEndTimestamp = moment(execution.start_locust).add(
    execution.configuration.configuration_parameters[0].value,
    'seconds'
  )
  const startTimestamp = +new Date(execution.start_locust)
  const endTimestamp = +new Date(execution.end_locust)

  return [startTimestamp, Math.max(endTimestamp, estimatedEndTimestamp)]
}
