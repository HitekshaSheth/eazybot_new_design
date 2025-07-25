<template>
  <div v-if="mdAndUp">
    <AppPageHeader
      :title="pageTitle"
      :breadcrumbs="breadcrumbs"
    />
    <VRow>
      <VCol cols="12" md="7">
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
                      <span>I agree with terms and conditions.<a href="#" class="text-primary text-decoration-underline">Click here.</a></span>
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
      <VCol cols="5" class="text-center" style="margin: auto">
        <img :src="transfer" style="vertical-align: middle;"/>
      </VCol>
    </VRow>
  </div>
  <div v-else>
    <div class="app-page-header d-flex justify-space-between align-center mb-6 flex-wrap gap-y-4">
      <!-- Title -->
      <h4 class="text-h4 m-0">
        Internal Transfer
      </h4>
    </div>
    <VRow>
      <VCol cols="12">
        <VForm
          ref="transferForm"
          @submit.prevent=""
        >
          <VRow>
            <VCol cols="12">
              <label class="font-600">Transfer to Email</label><br/>
              <AppTextField v-model="email"/>
            </VCol>
            <VCol cols="12">
              <CustomRadios
                v-model:selected-radio="selectedRadio"
                :radio-content="radioContent"
                :grid-column="{cols: '6' }">
                <template #default="{ item, isSelected }">
                  <div class="d-flex align-center justify-space-between w-100  custom-radio-item">
                    <div>
                      <span class="font-weight-medium">{{ item.title }}</span>
                    </div>
                    <img :src="Frame" alt="" height="15" style="vertical-align: middle;" />
                  </div>
                </template>
              </CustomRadios>
            </VCol>
            <VCol cols="12">
              <label class="font-600">Amount</label><br/>
              <AppTextField
                v-model="selectedRadio"
                type="number"
                disabled
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
                  <span style="font-size: 14px;">I agree with terms and conditions.<a href="#" class="text-primary text-decoration-underline">Click here.</a></span>
                </template>
              </VCheckbox>
            </VCol>
          </VRow>
          <div class="row pb-2">
            <!-- Add Button -->
            <VBtn block color="primary">Transfer</VBtn>
          </div>
        </VForm>
      </VCol>
    </VRow>
  </div>

</template>

<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import { VForm } from 'vuetify/components/VForm'
import transfer from '@/assets/images/transfer.png'
import { useDisplay } from 'vuetify'
import Frame from '@/assets/images/Frame.svg?url'

const { mdAndUp } = useDisplay()
const pageTitle = 'Transfer'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Wallet', to: '/my-wallet' },
  { title: 'Internal transfer' }
]
const amount = ref('100')
const email = "Test@gmail.com"
const selectedRadio = ref('100')

const radioContent = [
  {
    title: '100',
    value: '100',
  },
  {
    title: '200',
    value: '200',
  },
  {
    title: '500',
    value: '500',
  },
  {
    title: '1000',
    value: '1000',
  },
]

</script>

<style scoped>

</style>
