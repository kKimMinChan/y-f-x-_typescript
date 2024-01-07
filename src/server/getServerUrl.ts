export const getServerUrl = (path: string) => {
  const host = 'https://tmiteam.shop'
  return [host, path].join('')
}
