import _ from 'lodash'

export function reverse(str) {
  return [...str].reverse().join('')
}

export function truncateStart(str, options) {
  return reverse(_.truncate(reverse(str), options))
}

export function capitalizeWords(word) {
  return word
    .split(' ')
    .map(text => text.substring(0, 1).toUpperCase() + text.substring(1))
    .join(' ')
}
