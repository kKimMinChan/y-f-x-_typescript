export const getServerUrl = (path: string) => {
  const host = 'http://15.164.92.252:8080'
  return [host, path].join('')
}
