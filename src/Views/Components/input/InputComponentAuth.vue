<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <div v-bind="resolvedAttrs.wrapperAttrs.wrapper3" class="relative w-full">
        <label
          v-if="showLabel"
          v-bind="resolvedAttrs.labelAttrs"
          class="block text-sm font-medium flex items-center justify-between text-white mb-1">
          {{ labelText }}
          <span v-if="requiredDisplay === '*'" class="text-red-500">*</span>
          <span
            v-else-if="requiredDisplay === 'italic-text'"
            class="italic text-xs text-white">
            Required
          </span>
        </label>

        <!-- Left icon -->
        <component
          v-if="leftIcon"
          :is="leftIcon"
          class="absolute left-2 top-[50px] transform -translate-y-1/2 pointer-events-none w-5 h-5 text-white" />

        <!-- Input -->
        <div
          class="rounded-[0.625rem] border border-[#DEE5EC] bg-white/20 min-h-10 gap-2.5 pt-3 pb-3 px-2.5 flex justify-center items-center self-stretch">
          <input
            v-bind="resolvedAttrs.inputAttrs"
            class="w-full font-medium text-base text-white bg-transparent outline-none leading-6 tracking-[0.01rem] placeholder:text-white placeholder:font-light placeholder:text-base placeholder:leading-6 placeholder:tracking-[0.01rem]"
            :id="addId || resolvedAttrs.inputAttrs.id"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :class="[
               leftIcon ? 'pl-10' : 'pl-3',
               rightIcon ? 'pr-10' : 'pr-3'
             ]" />
        </div>

        <!-- Right icon -->
        <component
          v-if="rightIcon"
          :is="rightIcon"
          class="absolute right-2 top-[50px] transform -translate-y-1/2 pointer-events-none w-5 h-5 text-white" />

        <!-- Description -->
        <p
          v-if="description"
          v-bind="resolvedAttrs.descriptionAttrs"
          :class="[
            'mt-1 text-sm',
            descriptionType === 'error' ? 'text-red-400' :
            descriptionType === 'warning' ? 'text-orange-400' :
            descriptionType === 'success' ? 'text-green-400' :
            'text-white/80'
          ]">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveAllConfigs } from '@/utils/componentRenderingUtils'

const props = defineProps({
  modelValue: [String, Number],
  version: { type: String, default: '' },

  // Input attributes
  addId: String,
  removeId: Boolean,
  addClass: String,
  removeClass: Boolean,
  addAttributes: Object,
  removeAttributes: { type: Array as () => string[], default: () => [] },

  // Standard HTML input props
  name: String,
  placeholder: String,
  required: Boolean,
  autocomplete: String,

  // Label
  showLabel: Boolean,
  labelText: { type: String, default: 'Label' },
  requiredDisplay: { type: String, default: '' }, // "*" or "italic-text"

  // Description
  description: String,
  descriptionType: { type: String, default: 'default' }, // "error", "warning", "success", "default"

  // Icons
  leftIcon: [String, Object, Function],
  rightIcon: [String, Object, Function],

  // Wrapper overrides
  wrapperOverrides: { type: Array as () => any[], default: () => [] }
})

// Input component config for auth styling
const inputConfig = {
  wrappers: [
    {
      targetAttribute: 'wrapper1',
      addClass: 'mb-4',
      addAttributes: { 'data-wrapper': 'wrapper1' }
    },
    {
      targetAttribute: 'wrapper2',
      addClass: 'flex flex-col',
      addAttributes: { 'data-wrapper': 'wrapper2' }
    },
    {
      targetAttribute: 'wrapper3',
      addClass: 'relative',
      addAttributes: { 'data-wrapper': 'wrapper3' }
    }
  ],
  elm: {
    addClass: 'text-white border-transparent',
    addAttributes: {
      type: 'text'
    }
  },
  additionalConfig: {
    label: {
      addClass: 'text-sm text-white font-medium',
      addAttributes: {
        for: 'input-id'
      }
    },
    description: {
      addClass: 'text-sm text-white/80',
      addAttributes: {
        'data-description': 'true'
      }
    }
  }
}

// Resolve attributes with utility function
const resolvedAttrs = computed(() =>
  resolveAllConfigs(inputConfig, props.version, props)
)
</script>
