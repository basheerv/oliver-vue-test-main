type ConfigItem = {
  addId?: string
  addClass?: string
  addAttributes?: Record<string, any>
  removeId?: boolean
  removeClass?: boolean
  removeAttributes?: string[]
  versions?: Record<string, ConfigItem>
}

export function applyOverride(base: ConfigItem = {}, version = '', override: ConfigItem = {}) {
  const versionData = base.versions?.[version] || {}

  const merged: Record<string, any> = {
    id: override.addId ?? base.addId ?? undefined,
    class: [base.addClass, versionData.addClass, override.addClass]
      .filter(Boolean)
      .join(' ') || undefined,
    ...Object.assign(
      {},
      base.addAttributes || {},
      versionData.addAttributes || {},
      override.addAttributes || {}
    )
  }

  if (override.removeId) merged.id = undefined
  if (override.removeClass) merged.class = undefined
  if (Array.isArray(override.removeAttributes)) {
    for (const key of override.removeAttributes) {
      delete merged[key]
    }
  }

  return merged
}

type WrapperConfig = ConfigItem & {
  targetAttribute: string
}

type WrapperOverride = {
  target: string
  addId?: string
  addClass?: string
  addAttributes?: Record<string, any>
  removeId?: boolean
  removeClass?: boolean
  removeAttributes?: string[]
}

type ComponentConfig = {
  wrappers?: WrapperConfig[]
  elm?: ConfigItem
  additionalConfig?: {
    label?: ConfigItem
    description?: ConfigItem
  }
}

type ComponentProps = {
  addId?: string
  addClass?: string
  addAttributes?: Record<string, any>
  removeId?: boolean
  removeClass?: boolean
  removeAttributes?: string[]
  name?: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  wrapperOverrides?: WrapperOverride[]
}

export function resolveWrappers(wrappers: WrapperConfig[] = [], version = '', wrapperOverrides: WrapperOverride[] = []) {
  const wrapperAttrs: Record<string, any> = {}

  for (const wrapper of wrappers) {
    const key = wrapper.targetAttribute
    const override = wrapperOverrides.find(o => o.target === key) || {}
    wrapperAttrs[key] = applyOverride(wrapper, version, override)
  }

  return wrapperAttrs
}

export function resolveAllConfigs(config: ComponentConfig, version: string, props: ComponentProps = {}) {
  const wrapperOverrides = props.wrapperOverrides || []

  return {
    wrapperAttrs: resolveWrappers(config.wrappers, version, wrapperOverrides),
    inputAttrs: applyOverride(config.elm, version, {
      addId: props.addId,
      addClass: props.addClass,
      addAttributes: {
        name: props.name,
        placeholder: props.placeholder,
        required: props.required,
        autocomplete: props.autocomplete,
        ...(props.addAttributes || {})
      },
      removeId: props.removeId,
      removeClass: props.removeClass,
      removeAttributes: props.removeAttributes
    }),
    labelAttrs: applyOverride(config?.additionalConfig?.label || {}, version, {}),
    descriptionAttrs: applyOverride(config?.additionalConfig?.description || {}, version, {})
  }
}
