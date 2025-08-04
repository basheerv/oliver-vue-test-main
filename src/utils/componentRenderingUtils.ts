export interface ConfigItem {
  targetAttribute?: string
  addClass?: string
  removeClass?: boolean
  addAttributes?: Record<string, any>
  removeAttributes?: string[]
}

export interface ComponentConfig {
  wrappers?: ConfigItem[]
  elm?: ConfigItem
  additionalConfig?: Record<string, ConfigItem>
}

export function resolveAllConfigs(
  config: ComponentConfig,
  version: string = '',
  props: any = {}
): any {
  const result: any = {
    wrapperAttrs: {},
    inputAttrs: {},
    labelAttrs: {}
  }

  // Process wrappers
  if (config.wrappers) {
    config.wrappers.forEach((wrapper, index) => {
      const wrapperKey = wrapper.targetAttribute || `wrapper${index + 1}`
      result.wrapperAttrs[wrapperKey] = resolveConfig(wrapper, props)
    })
  }

  // Process input element
  if (config.elm) {
    result.inputAttrs = resolveConfig(config.elm, props)
  }

  // Process additional configs (like label)
  if (config.additionalConfig) {
    Object.keys(config.additionalConfig).forEach(key => {
      const configItem = config.additionalConfig![key]
      result[`${key}Attrs`] = resolveConfig(configItem, props)
    })
  }

  return result
}

function resolveConfig(configItem: ConfigItem, props: any): Record<string, any> {
  const resolved: Record<string, any> = {}

  // Handle class
  if (configItem.addClass) {
    resolved.class = configItem.addClass
  }

  // Handle attributes
  if (configItem.addAttributes) {
    Object.assign(resolved, configItem.addAttributes)
  }

  // Handle props overrides
  if (props.addClass) {
    resolved.class = resolved.class ? `${resolved.class} ${props.addClass}` : props.addClass
  }

  if (props.addAttributes) {
    Object.assign(resolved, props.addAttributes)
  }

  if (props.removeAttributes && configItem.removeAttributes) {
    props.removeAttributes.forEach((attr: string) => {
      delete resolved[attr]
    })
  }

  return resolved
}
