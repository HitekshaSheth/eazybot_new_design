<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
    <!-- Wallet Header -->
  <div v-if="mdAndUp">
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
            <VBtn class="mr-2" color="primary" prepend-icon="tabler-upload" :to="{ name: 'deposit'}">Deposit</VBtn>
            <VBtn class="mr-2" color="primary" variant="outlined" prepend-icon="tabler-download" :to="{ name: 'withdraw'}">Withdraw</VBtn>
            <VBtn color="primary" variant="outlined" prepend-icon="tabler-transform-point" :to="{ name: 'internal-transfer'}">Internal Transfer</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>


    <VCard>
      <!-- Tabs -->
      <VTabs v-model="activeTab" class="mb-4">
        <VTab v-for="tab in tabs" :key="tab" class="text-caption font-weight-bold">{{ tab }}</VTab>
      </VTabs>

      <!-- Search & Filter -->
      <VCardText>

        <VRow align="center" justify="space-between" class="pb-2">
          <!-- Left: Title -->
          <VCol cols="auto">
            <h3 class="mb-0">Covers</h3>
          </VCol>

          <!-- Right: Controls (Search, Filter, Download) -->
          <VCol cols="auto" class="d-flex align-center">
            <!-- Search Box -->
            <AppTextField
              v-model="search"
              placeholder="Search ..."
              append-inner-icon="tabler-search"
              style="width: 270px"
              single-line
              hide-details
              dense
              outlined
            />

            <!-- Filter Menu -->
            <VMenu v-model="filterMenu" :close-on-content-click="false" offset-y>
              <template #activator="{ props }">
                <VBtn class="ml-2" icon v-bind="props">
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

            <!-- Download Button -->
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
  </div>
  <div v-else>
    <VCard class="mb-4">
      <VCardText class="pa-3">
        <VRow no-gutters>
          <VCol cols="6">
            <h5 class="text-h5 text-no-wrap">
              Current Balance <VIcon icon="tabler-wallet" style="background-color: rgb(var(--v-global-theme-primary))"/>
            </h5>
            <p class="mb-2">
              USDT Tether
            </p>
          </VCol>
          <VCol cols="6" class="d-flex justify-end align-center mt-2 mb-1">
            <img :src="Frame" height="20" />
            <span class="text-h4 text-primary mb-1 pl-2 pr-2">{{ balance }}</span>
          </VCol>
          <VCol cols="12">
            <VBtn class="mr-2" color="primary" icon="tabler-upload"></VBtn>
            <VBtn class="mr-2" color="primary" variant="outlined" icon="tabler-download"></VBtn>
            <VBtn color="primary" variant="outlined" icon="tabler-transform-point"></VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard>
      <!-- Tabs -->
      <VTabs v-model="activeTab" class="mb-4">
        <VTab v-for="tab in tabs" :key="tab" class="text-caption font-weight-bold">{{ tab }}</VTab>
      </VTabs>
      <!-- Search & Filter -->
      <VCardText>

<!--        <VRow align="center" justify="space-between" class="pb-2">-->
<!--          &lt;!&ndash; Left: Title &ndash;&gt;-->
<!--          <VCol cols="auto">-->
<!--            <h3 class="mb-0">Covers</h3>-->
<!--          </VCol>-->

<!--          &lt;!&ndash; Right: Controls (Search, Filter, Download) &ndash;&gt;-->
<!--          <VCol cols="auto" class="d-flex align-center">-->
<!--            &lt;!&ndash; Search Box &ndash;&gt;-->
<!--            <AppTextField-->
<!--              v-model="search"-->
<!--              placeholder="Search ..."-->
<!--              append-inner-icon="tabler-search"-->
<!--              style="width: 270px"-->
<!--              single-line-->
<!--              hide-details-->
<!--              dense-->
<!--              outlined-->
<!--            />-->

<!--            &lt;!&ndash; Filter Menu &ndash;&gt;-->
<!--            <VMenu v-model="filterMenu" :close-on-content-click="false" offset-y>-->
<!--              <template #activator="{ props }">-->
<!--                <VBtn class="ml-2" icon v-bind="props">-->
<!--                  <VIcon icon="tabler-filter" />-->
<!--                </VBtn>-->
<!--              </template>-->
<!--              <VCard width="300">-->
<!--                <VCardText>-->
<!--                  <div class="font-weight-medium mb-2">Transaction Type</div>-->
<!--                  <VSwitch v-model="filters.deposit" label="Deposit" />-->
<!--                  <VSwitch v-model="filters.withdraw" label="Withdraw" />-->
<!--                  <VSwitch v-model="filters.transfer" label="Internal Transfer" />-->

<!--                  <div class="font-weight-medium mt-4 mb-2">Search By Date Range</div>-->
<!--                  <AppDateTimePicker-->
<!--                    v-model="filters.dateRange"-->
<!--                    placeholder="MM/DD/YYYY to MM/DD/YYYY"-->
<!--                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"-->
<!--                  />-->
<!--                </VCardText>-->
<!--                <VCardActions>-->
<!--                  <VSpacer />-->
<!--                  <VBtn @click="applyFilters" color="primary" variant="flat">Apply</VBtn>-->
<!--                  <VBtn @click="resetFilters" variant="outlined">Cancel</VBtn>-->
<!--                </VCardActions>-->
<!--              </VCard>-->
<!--            </VMenu>-->

<!--            &lt;!&ndash; Download Button &ndash;&gt;-->
<!--            <VBtn-->
<!--              icon="tabler-download"-->
<!--              color="primary"-->
<!--              class="ml-2"-->
<!--            />-->
<!--          </VCol>-->
<!--        </VRow>-->
        <!-- Table -->
<!--        <VDataTable-->
<!--          :headers="headers"-->
<!--          :items="filteredTransactions"-->
<!--          :search="search"-->
<!--        >-->
<!--          <template #item.comment="{ item }">-->
<!--            <div>-->
<!--              {{ item.comment }}-->
<!--              <div class="text-caption font-weight-bold mt-1" style="color: #475569;">{{ item.date }}</div>-->
<!--            </div>-->
<!--          </template>-->

<!--          <template #item.status="{ item }">-->
<!--            <VIcon v-if="item.status === 'success'" icon="tabler-circle-check" color="success" />-->
<!--            <VIcon v-else icon="tabler-circle-x" color="error" />-->
<!--          </template>-->

<!--          <template #item.type="{ item }">-->
<!--            <span class="text-error">DR</span>-->
<!--          </template>-->

<!--          <template #item.amount="{ item }">-->
<!--            <span class="font-weight-bold" style="color: #475569;">-->
<!--              $ {{ item.amount }}-->
<!--            </span>-->
<!--          </template>-->
<!--        </VDataTable>-->

        <VCard
          v-for="item in filteredTransactions"
          :key="item.id"
          class="mb-4 pa-3"
          elevation="1"
        >
          <VRow>
            <VCol cols="1" class="pr-0 pl-1">
              <!-- Type -->

              <VIcon color="error" v-if="item.type === 1" icon="tabler-credit-card-pay"></VIcon>
              <VIcon color="primary" icon="tabler-credit-card-refund" v-else></VIcon>
            </VCol>
            <VCol cols="8" class="pr-0 pl-1">
              <div class="font-weight-medium" style="color: #475569;">{{ item.comment }}</div>
              <div class="text-caption mt-1">{{ formatDate(item.date) }}</div>
            </VCol>
            <VCol cols="3" class="pr-0 pl-1">
              <!-- Amount -->
              <div class="font-weight-bold" style="color: #475569;">
                $ {{ item.amount }}
              </div>

              <!-- Status -->
              <div class="mt-1 d-flex align-center" v-if="item.status === 'failed'">
                <span class="text-error font-weight-medium" style="font-size: 10px;text-align: right">Failed <VIcon icon="tabler-circle-x"/></span>
              </div>

            </VCol>
          </VRow>
        </VCard>
      </VCardText>
    </VCard>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import Frame from '@/assets/images/Frame.svg?url'
import AppPageHeader from '@/components/AppPageHeader.vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

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
    type : 1
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'failed',
    amount: 993.62,
    type : 2
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'failed',
    amount: 993.62,
    type : 1
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
    type : 2
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
    type : 2
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
    type : 1
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'failed',
    amount: 993.62,
    type : 1
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
    type : 1
  },{
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'success',
    amount: 993.62,
  },
  {
    date: '2025-05-15',
    comment: 'Service fee 0.25% deduction from Trade 60741551',
    status: 'failed',
    amount: 993.62,
    type : 1
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
function formatDate(value) {
  const date = new Date(value)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
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
