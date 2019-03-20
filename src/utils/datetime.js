import moment from 'moment'

export const formatDuration = (timestamp, format) =>
  moment.utc(timestamp).format(format)
