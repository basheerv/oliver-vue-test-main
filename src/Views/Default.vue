<template>
  <div class="p-8 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Input Component Examples</h1>

    <div class="space-y-6">
      <!-- Basic input with user icon -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Basic Input with User Icon</h2>
        <InputComponentDefault
          v-model="basicInput"
          placeholder="Enter your name"
          show-label
          label-text="Full Name"
          :left-icon="UserIcon"
          description="Please enter your full name as it appears on your ID"
        />
      </div>

      <!-- Required input with email icon -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Required Input with Email Icon</h2>
        <InputComponentDefault
          v-model="requiredInput"
          placeholder="Enter your email"
          show-label
          label-text="Email Address"
          required
          required-display="*"
          :left-icon="EnvelopeIcon"
          description="We'll use this email to send you important updates"
        />
      </div>

      <!-- Input with italic required text -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Input with Italic Required Text</h2>
        <InputComponentDefault
          v-model="italicRequiredInput"
          placeholder="Enter your phone number"
          show-label
          label-text="Phone Number"
          required
          required-display="italic-text"
        />
      </div>

      <!-- Input with left icon -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Input with Left Icon</h2>
        <InputComponentDefault
          v-model="iconInput"
          placeholder="Search..."
          show-label
          label-text="Search"
          :left-icon="MagnifyingGlassIcon"
        />
      </div>

      <!-- Input with right icon -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Input with Right Icon</h2>
        <InputComponentDefault
          v-model="rightIconInput"
          placeholder="Enter password"
          show-label
          label-text="Password"
          :right-icon="EyeIcon"
        />
      </div>

      <!-- Input with both icons -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Input with Both Icons</h2>
        <InputComponentDefault
          v-model="bothIconsInput"
          placeholder="Enter amount"
          show-label
          label-text="Amount"
          :left-icon="CurrencyDollarIcon"
          :right-icon="CheckIcon"
        />
      </div>

      <!-- Custom styled input -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Custom Styled Input</h2>
        <InputComponentDefault
          v-model="customInput"
          placeholder="Custom styled input"
          show-label
          label-text="Custom Input"
          add-class="bg-blue-50 border-blue-300 focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
    </div>

    <!-- Display values -->
    <div class="mt-8 p-4 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Current Values:</h3>
      <pre class="text-sm text-gray-700">{{ displayValues }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputComponentDefault from './Components/input/InputComponentDefault.vue'
import { MagnifyingGlassIcon, EyeIcon, CurrencyDollarIcon, CheckIcon, UserIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

// Reactive data
const basicInput = ref('')
const requiredInput = ref('')
const italicRequiredInput = ref('')
const iconInput = ref('')
const rightIconInput = ref('')
const bothIconsInput = ref('')
const customInput = ref('')

// Computed property to display all values
const displayValues = computed(() => ({
  basicInput: basicInput.value,
  requiredInput: requiredInput.value,
  italicRequiredInput: italicRequiredInput.value,
  iconInput: iconInput.value,
  rightIconInput: rightIconInput.value,
  bothIconsInput: bothIconsInput.value,
  customInput: customInput.value
}))
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
