<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard Input Examples</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Beneficiary Account Input -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Beneficiary Account</h2>
        <InputComponentDashboard
          v-model="beneficiaryAccount"
          placeholder="Account number in local or IBAN format"
          show-label
          label-text="Beneficiary Account"
          :right-icon="QuestionMarkCircleIcon"
          description="Enter the account number in your local format or IBAN format"
        />
      </div>

      <!-- Account Holder Name -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Account Holder</h2>
        <InputComponentDashboard
          v-model="accountHolder"
          placeholder="Enter account holder name"
          show-label
          label-text="Account Holder Name"
          :left-icon="UserIcon"
          description="Enter the name exactly as it appears on the bank account"
        />
      </div>

      <!-- Bank Name -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Bank Information</h2>
        <InputComponentDashboard
          v-model="bankName"
          placeholder="Enter bank name"
          show-label
          label-text="Bank Name"
          :left-icon="BuildingOfficeIcon"
        />
      </div>

      <!-- Swift Code -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Swift Code</h2>
        <InputComponentDashboard
          v-model="swiftCode"
          placeholder="Enter SWIFT/BIC code"
          show-label
          label-text="SWIFT/BIC Code"
          :right-icon="QuestionMarkCircleIcon"
        />
      </div>

      <!-- Amount Input -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Transfer Amount</h2>
        <InputComponentDashboard
          v-model="amount"
          placeholder="Enter transfer amount"
          show-label
          label-text="Transfer Amount"
          required
          required-display="*"
          :left-icon="CurrencyDollarIcon"
        />
      </div>

      <!-- Reference Number -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Reference</h2>
        <InputComponentDashboard
          v-model="reference"
          placeholder="Enter reference number"
          show-label
          label-text="Reference Number"
          :left-icon="DocumentTextIcon"
        />
      </div>
    </div>

    <!-- Display values -->
    <div class="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Form Data:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><strong>Beneficiary Account:</strong> {{ beneficiaryAccount || 'Not entered' }}</div>
        <div><strong>Account Holder:</strong> {{ accountHolder || 'Not entered' }}</div>
        <div><strong>Bank Name:</strong> {{ bankName || 'Not entered' }}</div>
        <div><strong>SWIFT Code:</strong> {{ swiftCode || 'Not entered' }}</div>
        <div><strong>Amount:</strong> {{ amount || 'Not entered' }}</div>
        <div><strong>Reference:</strong> {{ reference || 'Not entered' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponentDashboard from './Components/input/InputComponentDashboard.vue'
import {
  QuestionMarkCircleIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

// Reactive data for form fields
const beneficiaryAccount = ref('')
const accountHolder = ref('')
const bankName = ref('')
const swiftCode = ref('')
const amount = ref('')
const reference = ref('')
</script>

<style scoped>
/* Dashboard-specific styles can be added here */
</style>
