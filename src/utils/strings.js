import _ from 'lodash'

export function reverse(str) {
  return [...str].reverse().join('')
}

export function truncateStart(str, options) {
  return reverse(_.truncate(reverse(str), options))
}
