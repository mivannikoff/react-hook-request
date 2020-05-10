import axios, { Method, AxiosRequestConfig } from 'axios'
import R from 'ramda'
import qs from 'qs'

export const setBaseUrl = (url: string | undefined) => {
  axios.defaults.baseURL = url
}

export const setHeader = (header: string, value: string | null) => {
  if (value === null) {
    delete axios.defaults.headers.common[header]
  } else {
    axios.defaults.headers.common[header] = value
  }
}

export interface IOptionsProps {
  method?: Method
  data?: any
  params?: any
  headers?: any
}

export const request = (url: string, options?: IOptionsProps) => {
  const method = R.pathOr('get', ['method'], options)
  const data = R.path(['data'], options)
  const params = R.path(['params'], options)

  const isHaveHttp = R.or(
    R.includes('http://', url),
    R.includes('https://', url)
  )

  const baseURL = isHaveHttp ? url : `${axios.defaults.baseURL}/${url}`

  const getParamsSerializer = (params: object) =>
    qs.stringify(params, { arrayFormat: 'repeat' })

  const requestConfig: AxiosRequestConfig = {
    url: baseURL,
    method,
    data,
    params,
    paramsSerializer: getParamsSerializer,
  }

  return axios(requestConfig)
}
