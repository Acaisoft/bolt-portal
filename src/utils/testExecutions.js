import moment from 'moment'

export const getExecutionTimestampDomain = execution => {
  const estimatedEndTimestamp = moment(execution.start_locust).add(
    execution.configuration.configuration_parameters[0].value,
    'seconds'
  )
  const startTimestamp = +new Date(execution.start_locust)

  return [startTimestamp, estimatedEndTimestamp]
}
