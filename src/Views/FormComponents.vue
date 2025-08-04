<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Form Components Demo</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Switch Component -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Switch Component</h2>
        <div class="space-y-4">
          <Switch
            v-model="darkMode"
            label="Toggle dark mode"
          />
          <Switch
            v-model="notifications"
            label="Enable notifications"
          />
          <div class="text-sm text-gray-600">
            Dark Mode: {{ darkMode ? 'On' : 'Off' }}<br>
            Notifications: {{ notifications ? 'On' : 'Off' }}
          </div>
        </div>
      </div>

      <!-- Radio Group Component -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Radio Group Component</h2>
        <RadioGroup
          v-model="subscriptionTier"
          name="subscription"
          label="Subscription Tier"
          :options="subscriptionOptions"
        />
        <div class="mt-4 text-sm text-gray-600">
          Selected: {{ subscriptionTier }}
        </div>
      </div>

      <!-- Checkbox Group Component -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Checkbox Group Component</h2>
        <CheckboxGroup
          v-model="selectedOptions"
          name="options"
          label="Checkbox Options"
          :options="checkboxOptions"
        />
        <div class="mt-4 text-sm text-gray-600">
          Selected: {{ selectedOptions.join(', ') || 'None' }}
        </div>
      </div>

      <!-- Textarea Component -->
      <CustomTextArea
        v-model="textareaContent"
        title="Textarea Component"
        label="Textarea"
        placeholder="Enter multiline text"
        :rows="4"
        :max-length="200"
      />
      <div class="mt-4 text-sm text-gray-600">
        Content length: {{ textareaContent.length }} characters
      </div>
    </div>

    <!-- Form Data Display -->
    <div class="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Form Data:</h3>
      <pre class="text-sm text-gray-700">{{ formData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Switch from './Components/Form/Switch.vue'
import RadioGroup from './Components/Form/RadioGroup.vue'
import CheckboxGroup from './Components/Form/CheckboxGroup.vue'
import CustomTextArea from './Components/Form/CustomTextArea.vue'

// Switch data
const darkMode = ref(false)
const notifications = ref(true)

// Radio group data
const subscriptionTier = ref('choice-a')
const subscriptionOptions = [
  { value: 'choice-a', label: 'Choice A' },
  { value: 'choice-b', label: 'Choice B' },
  { value: 'choice-c', label: 'Choice C' }
]

// Checkbox group data
const selectedOptions = ref<string[]>([])

interface CheckboxOption {
  value: string | number
  label: string
  description?: string
  tags?: Array<{
    text: string
    variant?: 'blue' | 'gray'
  }>
}

const checkboxOptions: CheckboxOption[] = [
  {
    value: 'show-username',
    label: 'Show fan\'s username on your post'
  },
  {
    value: 'legal-disclaimer',
    label: 'I have verified, preserved and currently hold all identification cards and documents required under Record Keeping Requirements, 18 U.S.C. 2257 and 28 C.F.R. 75, or applicable laws in any other jurisdictions, countries, and territories ("2257 documentation"), for all individuals appearing in the Content.',
    description: 'Legal requirement for content creators'
  },
  {
    value: 'silver-tier',
    label: 'Silver tier',
    tags: [{ text: 'Published Tier', variant: 'blue' }]
  },
  {
    value: 'new-test-tier',
    label: 'New test tier',
    tags: [{ text: 'Draft', variant: 'gray' }]
  }
]

// Textarea data
const textareaContent = ref('')

// Computed form data
const formData = computed(() => ({
  darkMode: darkMode.value,
  notifications: notifications.value,
  subscriptionTier: subscriptionTier.value,
  selectedOptions: selectedOptions.value,
  textareaContent: textareaContent.value
}))
</script>
