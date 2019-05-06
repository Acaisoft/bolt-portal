import { generatePath } from 'react-router-dom'

export const getSubpageUrl = (match, relativePath, params = {}) => {
  return generatePath(`${match.path}${relativePath}`, {
    ...match.params,
    ...params,
  })
}

export const getParentUrl = (url, steps = 1) =>
  url
    .split('/')
    .slice(0, -steps)
    .join('/')
