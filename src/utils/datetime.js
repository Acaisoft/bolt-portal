import moment from 'moment'

import { formatNumber, formatThousands } from './numbers'

export const formatDuration = (timestamp, format) =>
  moment.utc(timestamp).format(format)

export const formatScaledDuration = duration =>
  duration >= 1000
    ? `${formatNumber(duration / 1000, 1)} s`
    : duration < 1 && duration > 0
    ? `${formatThousands(duration, 2)} ms`
    : `${formatThousands(duration)} ms`
