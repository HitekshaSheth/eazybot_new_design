<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
  <AccountSetting />
  <div v-if="mdAndUp">
    <VRow class="mb-6">
      <!-- Left: Add Exchange Card -->
      <VCol cols="12" md="5">
        <VCard class="pa-8 d-flex align-center justify-space-between">
          <div>
            <h4>User Exchanges</h4>
            <VBtn color="primary" class="mt-10">+ Add User Exchange</VBtn>
          </div>
          <img :src="Exchange1" style="height: 100px;margin: 10px;">
          <!--        <VAvatar size="80" image="/placeholder-image.png" /> &lt;!&ndash; Replace with actual image &ndash;&gt;-->
        </VCard>
      </VCol>

      <!-- Right: Instruction Card -->
      <VCol cols="12" md="7" class="d-flex justify-end align-center">
        <div class="d-flex align-center gap-4">
          <img :src="Exchange2" style="height: 100px; margin-right: 10px;" />
          <div>
            <div class="font-weight-medium">Click Here For Step-by-Step</div>
            <VBtn variant="outlined" class="mt-2">Instructions</VBtn>
          </div>
        </div>
      </VCol>
    </VRow>
    <!-- Exchange Table -->
    <VCard>
      <VDataTable
        :headers="headers"
        :items="pagedExchanges"
        :items-per-page="itemsPerPage"
        density="comfortable"
      >
        <template #item.actions="{ index }">
          <VBtn icon variant="text" color="primary" @click="editExchange(index)">
            <VIcon icon="tabler-pencil" />
          </VBtn>
          <VBtn icon variant="text" color="error" @click="deleteExchange(index)">
            <VIcon icon="tabler-trash" />
          </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
  <div v-else>
    <VRow class="mb-6">
      <!-- Left: Add Exchange Card -->
      <VCol cols="12">
        <VCard class="pa-4 d-flex align-center justify-space-between">
          <div>
            <h4>User Exchanges</h4>
            <VBtn color="primary" class="mt-5">+ Add User Exchange</VBtn>
          </div>
          <img :src="Exchange1" style="height: 80px;margin: 10px;">
          <!--        <VAvatar size="80" image="/placeholder-image.png" /> &lt;!&ndash; Replace with actual image &ndash;&gt;-->
        </VCard>
      </VCol>

      <!-- Right: Instruction Card -->
      <VCol cols="12" md="7" class="d-flex justify-end align-center">
        <div class="d-flex align-center gap-4">
          <img :src="Exchange2" style="height: 80px; margin-right: 10px;" />
          <div>
            <div class="font-weight-medium">Click Here For Step-by-Step</div>
            <VBtn variant="outlined" class="mt-2">Instructions</VBtn>
          </div>
        </div>
      </VCol>
    </VRow>

    <VDataTable
      :items="exchanges"
      item-value="id"
      hide-default-header
      class="elevation-0"
    >
      <!-- Custom card-style row rendering -->
      <template #item="{ item }">
    <VCard class="mb-4 pa-3" elevation="1">
      <VRow>
        <VCol cols="2" class="pr-0 pl-1">
          <!-- Type -->
          <div class="font-weight-medium">{{ item.id }}</div>
        </VCol>
        <VCol cols="5" class="pr-0 pl-1">
          <div class="font-weight-medium">{{ item.user }}</div>
          <div class="text-caption" style="color: #475569;">{{ item.exchange }}</div>
        </VCol>
        <VCol cols="3" class="pr-0 pl-1">
          <!-- Amount -->
          <div class="font-weight-bold" style="color: #475569;">
            {{ item.connection }}
          </div>
        </VCol>
        <VCol cols="2" class="pr-0 pl-0">
          <VBtn icon="tabler-pencil" size="25" color="primary" @click="editExchange(index)">
          </VBtn>
          <VBtn icon="tabler-trash" class="ml-1" size="25" color="error" @click="deleteExchange(index)">
          </VBtn>
        </VCol>
      </VRow>
    </VCard>
      </template>
    </VDataTable>
  </div>
</template>

<script setup>
import AccountSetting from '../components/AccountSetting.vue'

const pageTitle = 'My Exchanges'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Exchanges' }
]

import { computed } from 'vue'
import Exchange1 from '@/assets/images/Exchange1.svg?url'
import Exchange2 from '@/assets/images/Exchange2.svg?url'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Connection Name', key: 'connection' },
  { title: 'User', key: 'user' },
  { title: 'Exchange', key: 'exchange' },
  { title: 'Action', key: 'actions', sortable: false },
]

const exchanges = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: 18828,
    connection: 'Binance',
    user: 'Sagar Shah',
    exchange: 'Binance',
  }))
)

const page = ref(1)
const itemsPerPage = 10

const totalPages = computed(() => Math.ceil(exchanges.value.length / itemsPerPage))

const pagedExchanges = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return exchanges.value.slice(start, start + itemsPerPage)
})

function editExchange(index) {
  alert(`Edit Exchange at index ${index}`)
}

function deleteExchange(index) {
  const globalIndex = (page.value - 1) * itemsPerPage + index
  exchanges.value.splice(globalIndex, 1)
}
</script>

<style scoped>
::v-deep(.v-table th) {
  text-transform: capitalize;
  font-weight: bold!important;
}
@media (max-width: 600px) {
  ::v-deep(.v-table__wrapper){
    overflow: unset;
  }
}
</style>
