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

      <!-- Transfer Type Selection -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Transfer Type</h2>
        <RadioGroup
          v-model="transferType"
          name="transfer-type"
          label="Select Transfer Type"
          :options="transferTypeOptions"
        />
      </div>

      <!-- Transfer Options -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Transfer Options</h2>
        <CheckboxGroup
          v-model="transferOptions"
          name="transfer-options"
          label="Additional Options"
          :options="transferOptionsList"
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
          description="Amount exceeds daily limit"
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

      <!-- Transfer Settings -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Transfer Settings</h2>
        <div class="space-y-4">
          <Switch
            v-model="urgentTransfer"
            label="Urgent Transfer"
          />
          <Switch
            v-model="saveTemplate"
            label="Save as Template"
          />
          <Switch
            v-model="notifications"
            label="Send Notifications"
          />
        </div>
      </div>

      <!-- Transfer Notes -->
      <CustomTextArea
        v-model="transferNotes"
        title="Transfer Notes"
        placeholder="Enter any additional notes for this transfer"
        :rows="4"
        :max-length="500"
      />
    </div>

    <!-- Display values -->
    <div class="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Form Data:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><strong>Beneficiary Account:</strong> {{ beneficiaryAccount || 'Not entered' }}</div>
        <div><strong>Account Holder:</strong> {{ accountHolder || 'Not entered' }}</div>
        <div><strong>Transfer Type:</strong> {{ transferType }}</div>
        <div><strong>SWIFT Code:</strong> {{ swiftCode || 'Not entered' }}</div>
        <div><strong>Amount:</strong> {{ amount || 'Not entered' }}</div>
        <div><strong>Transfer Options:</strong> {{ transferOptions.join(', ') || 'None' }}</div>
        <div><strong>Urgent Transfer:</strong> {{ urgentTransfer ? 'Yes' : 'No' }}</div>
        <div><strong>Save Template:</strong> {{ saveTemplate ? 'Yes' : 'No' }}</div>
        <div><strong>Notifications:</strong> {{ notifications ? 'Yes' : 'No' }}</div>
        <div><strong>Transfer Notes:</strong> {{ transferNotes || 'None' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponentDashboard from './Components/input/InputComponentDashboard.vue'
import RadioGroup from './Components/Form/RadioGroup.vue'
import CheckboxGroup from './Components/Form/CheckboxGroup.vue'
import Switch from './Components/Form/Switch.vue'
import CustomTextArea from './Components/Form/CustomTextArea.vue'
import {
  QuestionMarkCircleIcon,
  UserIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

// Reactive data for form fields
const beneficiaryAccount = ref('')
const accountHolder = ref('')
const swiftCode = ref('')
const amount = ref('')

// Transfer type selection
const transferType = ref('domestic')
const transferTypeOptions = [
  { value: 'domestic', label: 'Domestic Transfer' },
  { value: 'international', label: 'International Transfer' },
  { value: 'urgent', label: 'Urgent Transfer' }
]

// Transfer options
const transferOptions = ref<string[]>([])
const transferOptionsList = [
  {
    value: 'save-recipient',
    label: 'Save Recipient Details',
    description: 'Store this recipient for future transfers'
  },
  {
    value: 'email-notification',
    label: 'Email Notification',
    description: 'Send confirmation email to recipient'
  },
  {
    value: 'sms-notification',
    label: 'SMS Notification',
    tags: [{ text: 'Premium', variant: 'blue' as const }]
  },
  {
    value: 'tracking',
    label: 'Transfer Tracking',
    tags: [{ text: 'New', variant: 'gray' as const }]
  }
]

// Transfer settings
const urgentTransfer = ref(false)
const saveTemplate = ref(true)
const notifications = ref(true)

// Transfer notes
const transferNotes = ref('')
</script>

<style scoped>
/* Dashboard-specific styles can be added here */
</style>
