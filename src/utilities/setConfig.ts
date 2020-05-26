import globalConfig, { IGlobalConfig } from '../globalConfig'

type Config =
  | ((config: Readonly<IGlobalConfig>) => Partial<IGlobalConfig>)
  | Partial<IGlobalConfig>

export default function setConfig(config: Config) {
  if (typeof config === 'function') {
    return Object.assign(globalConfig, config(globalConfig))
  }

  return Object.assign(globalConfig, config)
}
