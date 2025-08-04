<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <div v-bind="resolvedAttrs.wrapperAttrs.wrapper3" class="relative w-full">
        <label
          v-if="showLabel"
          v-bind="resolvedAttrs.labelAttrs"
          class="block text-sm font-medium text-gray-700 mb-1">
          {{ labelText }}
          <span v-if="requiredDisplay === '*'" class="text-red-500">*</span>
          <span
            v-else-if="requiredDisplay === 'italic-text'"
            class="italic text-xs text-gray-500 float-right">
            Required
          </span>
        </label>

        <!-- Left icon -->
        <component
          v-if="leftIcon"
          :is="leftIcon"
          class="absolute left-2 top-[45px] transform -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-400" />

        <!-- Input -->
        <input
          v-bind="resolvedAttrs.inputAttrs"
          :id="addId || resolvedAttrs.inputAttrs.id"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          :class="[
            'py-2 border rounded-md w-full focus:outline-none',
            leftIcon ? 'pl-10' : 'pl-3',
            rightIcon ? 'pr-10' : 'pr-3'
          ]" />

        <!-- Right icon -->
        <component
          v-if="rightIcon"
          :is="rightIcon"
          class="absolute right-2 top-[45px] transform -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-400" />
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

  // Icons
  leftIcon: [String, Object, Function],
  rightIcon: [String, Object, Function],

  // Wrapper overrides
  wrapperOverrides: { type: Array as () => any[], default: () => [] }
})

// Input component config for default styling
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
    addClass: 'text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    addAttributes: {
      type: 'text'
    }
  },
  additionalConfig: {
    label: {
      addClass: 'text-sm text-gray-700 font-medium',
      addAttributes: {
        for: 'input-id'
      }
    }
  }
}

// Resolve attributes with utility function
const resolvedAttrs = computed(() =>
  resolveAllConfigs(inputConfig, props.version, props)
)
</script>
