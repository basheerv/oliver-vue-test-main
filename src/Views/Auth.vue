<template>
  <div class="min-h-screen bg-gray-600 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Auth Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-white/80">Sign in to your account</p>
      </div>

      <!-- Auth Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Input -->
          <div>
            <InputComponentAuth
              v-model="email"
              placeholder="Enter your email"
              show-label
              label-text="Email Address"
              required
              required-display="italic-text"
              :left-icon="EnvelopeIcon"
            />
          </div>

          <!-- Password Input -->
          <div>
            <InputComponentAuth
              v-model="password"
              placeholder="Password"
              show-label
              label-text="Password"
              required
              required-display="italic-text"
              :right-icon="EyeSlashIcon"
              type="password"
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span class="ml-2 text-sm text-white">Remember me</span>
            </label>
            <a href="#" class="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="text-white/80">
            Don't have an account?
            <a href="#" class="text-blue-400 hover:text-blue-300 font-medium">Sign up</a>
          </p>
        </div>
      </div>

      <!-- Form Data Display (for demo) -->
      <div class="mt-8 p-4 bg-white/10 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Form Data:</h3>
        <div class="text-sm text-white/80 space-y-1">
          <div><strong>Email:</strong> {{ email || 'Not entered' }}</div>
          <div><strong>Password:</strong> {{ password ? '••••••••' : 'Not entered' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponentAuth from './Components/input/InputComponentAuth.vue'
import { EnvelopeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

// Reactive data
const email = ref('')
const password = ref('')

// Form submission handler
const handleSubmit = () => {
  console.log('Form submitted:', {
    email: email.value,
    password: password.value
  })
  // Here you would typically handle authentication
}
</script>

<style scoped>
/* Additional auth-specific styles can be added here */
</style>
