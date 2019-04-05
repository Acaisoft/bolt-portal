import moment from 'moment'

export const getExecutionTimestampDomain = execution => {
  const executionDuration = +execution.configuration.configuration_parameters[0]
    .value

  const startTimestamp = new Date(execution.start_locust)
  const estimatedEndTimestamp = moment(startTimestamp)
    .add(executionDuration, 'seconds')
    .toDate()

  return [+startTimestamp, +estimatedEndTimestamp]
}
