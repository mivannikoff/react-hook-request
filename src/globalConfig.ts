type Headers = {
  [key: string]: string
}

export interface IGlobalConfig {
  baseUrl: string
  headers: Headers
  showConsoleError?: boolean
}

const globalConfig: IGlobalConfig = {
  baseUrl: window.origin,
  headers: {},
  showConsoleError: true,
}

export default globalConfig
