<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
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

</template>

<script setup>
const pageTitle = 'My Exchanges'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Exchanges' }
]

import { computed } from 'vue'
import Exchange1 from '@/assets/images/Exchange1.svg?url'
import Exchange2 from '@/assets/images/Exchange2.svg?url'

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
</style>
