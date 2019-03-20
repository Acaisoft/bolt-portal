import moment from 'moment'

export const getExecutionTimestampDomain = execution => {
  const estimatedEndTimestamp = moment(execution.start).add(
    execution.configuration.configuration_parameters[0].value,
    'seconds'
  )
  const startTimestamp = +new Date(execution.start)
  const endTimestamp = +new Date(execution.end)

  return [startTimestamp, Math.max(endTimestamp, estimatedEndTimestamp)]
}
