<template>
  <div class="flex items-start">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
    />
    <div class="ml-3 flex-1">
      <label
        v-if="label"
        :for="id"
        class="text-sm font-medium text-gray-700"
      >
        {{ label }}
      </label>
      <p v-if="description" class="text-sm text-gray-500 mt-1">
        {{ description }}
      </p>
      <div v-if="tags && tags.length > 0" class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="tag in tags"
          :key="tag.text"
          :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            tag.variant === 'blue' ? 'bg-blue-100 text-blue-800' :
            tag.variant === 'gray' ? 'bg-gray-100 text-gray-800' :
            'bg-gray-100 text-gray-800'
          ]"
        >
          {{ tag.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  text: string
  variant?: 'blue' | 'gray'
}

const props = defineProps<{
  modelValue: boolean
  label?: string
  description?: string
  tags?: Tag[]
  id?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
