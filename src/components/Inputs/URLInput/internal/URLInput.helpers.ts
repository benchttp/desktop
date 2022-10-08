export const isValidURL = (value: string): boolean => {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return false
  }
  return (
    url.protocol === 'http:' ||
    url.protocol === 'https:' ||
    url.protocol === 'localhost:'
  )
}
