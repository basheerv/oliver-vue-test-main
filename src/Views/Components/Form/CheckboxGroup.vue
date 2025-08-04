<template>
  <div class="space-y-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div class="space-y-3">
      <Checkbox
        v-for="option in options"
        :key="option.value"
        :model-value="selectedValues.includes(option.value)"
        :label="option.label"
        :description="option.description"
        :tags="option.tags"
        :id="`${name}-${option.value}`"
        @update:model-value="toggleOption(option.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'

interface CheckboxOption {
  value: string | number
  label: string
  description?: string
  tags?: Array<{
    text: string
    variant?: 'blue' | 'gray'
  }>
}

const props = defineProps<{
  modelValue: (string | number)[]
  name: string
  label?: string
  options: CheckboxOption[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
}>()

const selectedValues = computed(() => props.modelValue)

const toggleOption = (value: string | number) => {
  const newValues = selectedValues.value.includes(value)
    ? selectedValues.value.filter(v => v !== value)
    : [...selectedValues.value, value]
  emit('update:modelValue', newValues)
}
</script>
