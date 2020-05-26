import { AxiosError } from 'axios'

type Headers = {
  [key: string]: string
}

export interface IGlobalConfig {
  baseUrl: string
  headers: Headers
  showConsoleError?: boolean
  globalErrorCallback: (error: AxiosError) => void
}

const globalConfig: IGlobalConfig = {
  baseUrl: window.origin,
  headers: {},
  showConsoleError: true,
  globalErrorCallback: () => {},
}

export default globalConfig
