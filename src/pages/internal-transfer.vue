<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="7">
      <VCard>
        <!--      <VCardTitle>Deposit Balance</VCardTitle>-->
        <VCardText>
          <VForm
            ref="transferForm"
            @submit.prevent=""
          >
            <VRow>
              <VCol cols="12">
                <h3>Internal Transfer</h3>
              </VCol>
              <VCol cols="12">
                <label class="font-600">Transfer to Email</label><br/>
                <AppTextField v-model="email"/>
              </VCol>
              <VCol cols="12">
                <label class="font-600">Amount</label><br/>
                <AppTextField
                  v-model="amount"
                  type="number"
                  placeholder="100"
                />
              </VCol>

              <VCol cols="12">
                <!-- Terms & Conditions -->
                <VCheckbox
                  v-model="agreed"
                  class="mb-4"
                  label="I agree with terms and conditions. "
                >
                  <template #label>
                    I agree with terms and conditions.
                    <a href="#" class="text-primary text-decoration-underline">Click here.</a>
                  </template>
                </VCheckbox>
              </VCol>
            </VRow>
            <div class="row pb-2">
              <!-- Add Button -->
              <VBtn color="primary">Transfer</VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="5" style="margin: auto">
      <img :src="transfer" style="vertical-align: middle;"/>
    </VCol>
  </VRow>
</template>

<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import { VForm } from 'vuetify/components/VForm'
import transfer from '@/assets/images/transfer.png'

const pageTitle = 'Transfer'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Wallet', to: '/my-wallet' },
  { title: 'Internal transfer' }
]
const amount = 100
const email = "Test@gmail.com"
</script>

<style scoped>

</style>
