import {getServerUrl} from './getServerUrl'

export const get = (path: string, jwt?: string | null) => {
  const headers: {
    'Content-Type': string
    Authorization?: string
  } = {
    'Content-Type': 'application/json'
  }

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`
  }

  return fetch(getServerUrl(path), {
    method: 'GET',
    headers: headers
  })
}

export const del = (path: string, jwt?: string | null) => {
  const headers: {
    'Content-Type': string
    Authorization?: string
  } = {
    'Content-Type': 'application/json'
  }

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`
  }
  return fetch(getServerUrl(path), {method: 'DELETE', headers: headers})
}
