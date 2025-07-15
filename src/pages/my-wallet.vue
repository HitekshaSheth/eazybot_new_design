<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
    <!-- Wallet Header -->
    <VCard class="mb-4" title="Current Balance">
      <template #append>
        <VIcon icon="tabler-wallet" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
      </template>
      <VCardText>
        <VRow align="center" justify="space-between">
          <VCol>
            <div class="usdt">USDT Tether</div>
            <div class="d-flex align-center mt-2">
              <img :src="Frame"> <span class="wallet-balance pl-2 pr-2">{{ balance }}</span>
              <VIcon icon="tabler-s-turn-up" size="22"  style="background-color: green"/>
              <span class="text-success" label>-{{ profitPercent }}%</span>
            </div>
          </VCol>
          <VCol cols="auto" style="margin-top: auto;">
            <VBtn class="mr-2" color="primary" prepend-icon="tabler-upload">Deposit</VBtn>
            <VBtn class="mr-2" color="primary" variant="outlined" prepend-icon="tabler-download">Withdraw</VBtn>
            <VBtn color="primary" variant="outlined" prepend-icon="tabler-transform-point">Internal Transfer</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Tabs -->
    <VTabs v-model="activeTab" class="mb-4">
      <VTab v-for="tab in tabs" :key="tab" class="text-caption font-weight-bold">{{ tab }}</VTab>
    </VTabs>

    <!-- Search & Filter -->
    <VCard>
      <VCardText>
        <VRow align="center" class="pb-2" justify="space-between">
          <VCol cols="12" md="8">
            <h3>Covers</h3>
          </VCol>
          <VCol cols="12" md="3">
            <AppTextField
              v-model="search"
              placeholder="Search ..."
              append-inner-icon="tabler-search"
              single-line
              hide-details
              dense
              outlined
            />
          </VCol>
          <VCol cols="auto">
            <VMenu v-model="filterMenu" :close-on-content-click="false" offset-y>
              <template #activator="{ props }">
                <VBtn icon v-bind="props">
                  <VIcon icon="tabler-filter" />
                </VBtn>
              </template>
              <VCard width="300">
                <VCardText>
                  <div class="font-weight-medium mb-2">Transaction Type</div>
                  <VSwitch v-model="filters.deposit" label="Deposit" />
                  <VSwitch v-model="filters.withdraw" label="Withdraw" />
                  <VSwitch v-model="filters.transfer" label="Internal Transfer" />

                  <div class="font-weight-medium mt-4 mb-2">Search By Date Range</div>
                  <AppDateTimePicker
                    v-model="filters.dateRange"
                    placeholder="MM/DD/YYYY to MM/DD/YYYY"
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                  />
                </VCardText>
                <VCardActions>
                  <VSpacer />
                  <VBtn @click="applyFilters" color="primary" variant="flat">Apply</VBtn>
                  <VBtn @click="resetFilters" variant="outlined">Cancel</VBtn>
                </VCardActions>
              </VCard>
            </VMenu>
            <VBtn
              icon="tabler-download"
              color="primary"
              class="ml-2"
            />
          </VCol>
        </VRow>
        <!-- Table -->
        <VDataTable
          :headers="headers"
          :items="filteredTransactions"
          :search="search"
        >
          <template #item.comment="{ item }">
            <div>
              {{ item.comment }}
              <div class="text-caption font-weight-bold mt-1" style="color: #475569;">{{ item.date }}</div>
            </div>
          </template>

          <template #item.status="{ item }">
            <VIcon v-if="item.status === 'success'" icon="tabler-circle-check" color="success" />
            <VIcon v-else icon="tabler-circle-x" color="error" />
          </template>

          <template #item.type="{ item }">
            <span class="text-error">DR</span>
          </template>

          <template #item.amount="{ item }">
            <span class="font-weight-bold" style="color: #475569;">
              $ {{ item.amount }}
            </span>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
</template>

<script setup>
import { ref, computed } from 'vue'
import Frame from '@/assets/images/Frame.svg?url'

const pageTitle = 'My Wallet'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Wallet' }
]
const balance = ref(523.65)
const profitPercent = ref(50.15)
const activeTab = ref(0)
const search = ref('')
const page = ref(1)
const itemsPerPage = 8

const tabs = ['All', 'D/W/T', 'Upgrades & Renewals', 'Service Fee', 'Affiliate Commission', 'Founders Club Bonus']

const filterMenu = ref(false)
const filters = ref({
  deposit: true,
  withdraw: true,
  transfer: true,
  dateRange: '',
})

const headers = [
  { title: 'Date', key: 'date' },
  { title: 'Comment/Date', key: 'comment' },
  { title: 'Status', key: 'status' },
  { title: 'Type', key: 'type' },
  { title: 'Amount', key: 'amount' },
]

const allTransactions = ref([
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  // Repeat as needed
])

const filteredTransactions = computed(() => {
  // In real apps, filter with date and type
  return allTransactions.value
})

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage)
})

function applyFilters() {
  filterMenu.value = false
  // Add real filter logic here
}

function resetFilters() {
  filters.value = {
    deposit: true,
    withdraw: true,
    transfer: true,
    dateRange: '',
  }
  filterMenu.value = false
}
</script>

<style scoped>
.text-error {
  color: red;
}
.usdt{
  font-size: 16px;
  font-weight: 500;
  color: #475569;
}
.wallet-balance{
  font-size: 32px;
  font-weight: 600;
  color: #1e293b;
}
::v-deep(thead){
  background-color: #f1f5f9!important;
  border-bottom: 1px solid #c1c4c7!important;
}
::v-deep(th){
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}
.v-tabs .v-btn {
  color: #717680;
}
::v-deep(.v-table th) {
  text-transform: capitalize;
  font-weight: bold!important;
}
</style>
