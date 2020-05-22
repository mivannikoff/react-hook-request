export default function formatUrl(url: string) {
  return url.replace(/^\/|\/$/g, '')
}
