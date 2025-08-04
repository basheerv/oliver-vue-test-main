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
          description="Please include your country code"
          description-type="default"
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

      <!-- Username validation input -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Username Validation</h2>
        <InputComponentDefault
          v-model="usernameInput"
          placeholder="Enter your username"
          show-label
          label-text="Username"
          description="Usernames cannot be changed after your first month on Fansocial, but special circumstances may allow for exceptions. Please contact us if you need assistance with changing your username."
          :validation-rules="usernameValidationRules"
        />
      </div>

      <!-- Warning state input -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Warning State Input</h2>
        <InputComponentDefault
          v-model="warningInput"
          placeholder="Enter your password"
          show-label
          label-text="Password"
          description="Password strength is weak"
          description-type="warning"
        />
      </div>

      <!-- Success state input -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Success State Input</h2>
        <InputComponentDefault
          v-model="successInput"
          placeholder="Enter your email"
          show-label
          label-text="Email"
          description="Email format is valid"
          description-type="success"
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
const errorInput = ref('')
const warningInput = ref('')
const successInput = ref('')
const usernameInput = ref('')

// Username validation rules
const usernameValidationRules = computed(() => {
  const username = usernameInput.value
  const rules = [
    {
      id: 'length',
      message: 'Must be between 3 and 100 characters long.',
      status: username.length >= 3 && username.length <= 100 ? 'valid' : 'error'
    },
    {
      id: 'characters',
      message: 'Can contain any letters from a-z, any numbers from 0-9.',
      status: /^[a-z0-9]+$/.test(username) ? 'valid' : 'error'
    },
    {
      id: 'spaces',
      message: 'Cannot contain space.',
      status: !username.includes(' ') ? 'valid' : 'error'
    },
    {
      id: 'availability',
      message: `Good news! Username '${username}' is available!`,
      status: username.length >= 3 && /^[a-z0-9]+$/.test(username) && !username.includes(' ') ? 'valid' : 'pending'
    }
  ]
  return rules
})

// Computed property to display all values
const displayValues = computed(() => ({
  basicInput: basicInput.value,
  requiredInput: requiredInput.value,
  italicRequiredInput: italicRequiredInput.value,
  iconInput: iconInput.value,
  rightIconInput: rightIconInput.value,
  bothIconsInput: bothIconsInput.value,
  errorInput: errorInput.value,
  warningInput: warningInput.value,
  successInput: successInput.value,
  usernameInput: usernameInput.value
}))
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
