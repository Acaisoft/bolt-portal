import { generatePath } from 'react-router-dom'

export const getUrl = (path, params) => generatePath(path, params)

export const getSubpageUrl = (match, relativePath, params = {}) => {
  return generatePath(`${match.path}${relativePath}`, {
    ...match.params,
    ...params,
  })
}

export const getParentUrl = (url, steps = 1) =>
  url.split('/').slice(0, -steps).join('/')

export const redirectToExternalLoginPage = (fromUrl = window.location.href) => {
  window.location.href = `${process.env.REACT_APP_AUTH_SERVICE_URL}?redirect_url=${fromUrl}`
  return null
}
