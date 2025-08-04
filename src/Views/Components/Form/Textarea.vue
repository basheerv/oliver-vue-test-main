<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxLength"
        class="block w-full rounded-md border-gray-300 shadow-sm resize-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-none"
      />
      <div v-if="maxLength" class="absolute bottom-2 right-2 text-xs text-gray-500">
        {{ characterCount }}/{{ maxLength }} characters
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  error?: string
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const characterCount = computed(() => props.modelValue.length)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>
