import * as React from 'react'
import { AxiosPromise, AxiosError } from 'axios'
import R from 'ramda'
import globalConfig from '../globalConfig'

type Config = {
  errorLabel?: string
  showConsoleError?: boolean
}

type Callbacks<D> = {
  successCallback?: (data: D) => void
  errorCallback?: (error: AxiosError) => void
  finallyCallback?: () => void
}

type Options<T, D> = {
  params: T
  callbacks?: Callbacks<D>
}

const defaultCallbacksValue = {
  successCallback: (data: any) => data,
  errorCallback: (error: any) => error,
  finallyCallback: () => {},
}

export const useRequest = <T, D>(
  method: (params: T) => AxiosPromise<D>,
  config?: Config
) => {
  const configList = {
    ...globalConfig,
    ...config,
  }

  const isMounted = React.useRef(true)

  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<any>(undefined)
  const [data, setData] = React.useState<D | undefined>(undefined)

  React.useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )

  const handleUpdateData = React.useCallback(
    (data: D) => {
      setData(data)
    },
    [setData]
  )

  const handleReset = React.useCallback(() => {
    setData(undefined)
  }, [setData])

  const handleRequest = React.useCallback(
    async ({ params, callbacks }: Options<T, D>) => {
      const callbackList = {
        ...defaultCallbacksValue,
        ...callbacks,
      }

      if (isMounted.current) {
        setLoading(true)
      }

      try {
        const response = await method(params)
        const { data } = response

        if (isMounted.current) {
          setData(data)
          setError(undefined)
        }

        callbackList.successCallback(data)
      } catch (error) {
        if (configList.showConsoleError && configList.errorLabel) {
          console.log(`${configList.errorLabel} * `, { error })
        }

        const errorMessage = R.path(['response', 'data', 'message'], error)

        if (isMounted.current) {
          setError({ ...error, errorMessage })
          setData(undefined)
        }

        callbackList.errorCallback(error)

        globalConfig.globalErrorCallback(error)
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }

        callbackList.finallyCallback()
      }
    },
    [method, configList, setLoading, setData, setError]
  )

  return {
    loading,
    error,
    data,
    request: handleRequest,
    reset: handleReset,
    updateData: handleUpdateData,
  }
}
