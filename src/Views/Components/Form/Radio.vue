<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label
      v-if="label"
      :for="id"
      class="ml-3 block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  value: string | number
  name: string
  label?: string
  id?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
