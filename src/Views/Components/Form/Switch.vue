<template>
  <div class="flex items-center justify-between">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <button
      type="button"
      @click="toggle"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        modelValue ? 'bg-blue-600' : 'bg-gray-200'
      ]"
      :aria-checked="modelValue"
      role="switch"
    >
      <span
        :class="[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          modelValue ? 'translate-x-6' : 'translate-x-1'
        ]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
