<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
    <VCard>
<!--      <VCardTitle>Deposit Balance</VCardTitle>-->
      <VCardText>
        <VForm
          ref="depositForm"
          @submit.prevent=""
        >
          <VRow>
            <VCol cols="12">
              <h3>Deposit Balance</h3>
            </VCol>
            <VCol cols="12">
              <CustomRadios
                v-model:selected-radio="selectedRadio"
                :radio-content="radioContent"
                :grid-column="{ sm: '3', cols: '6' }"
              >
                <template #default="{ item, isSelected }">
                  <div class="d-flex align-center justify-space-between w-100  custom-radio-item">
                    <div>
                      <span class="font-weight-medium">{{ item.title }}</span>
                    </div>
                    <img :src="item.img" alt="" height="20" />
                  </div>
                </template>
              </CustomRadios>
            </VCol>
            <VCol cols="12">
              <label class="font-weight-bold">Deposit Amount</label><br/>
              <CustomRadios
                v-model:selected-radio="selectedRadio2"
                :radio-content="radioContent2"
                :grid-column="{ sm: '3', cols: '6' }">
                <template #default="{ item, isSelected }">
                  <div class="d-flex align-center justify-space-between w-100  custom-radio-item">
                    <div>
                      <span class="font-weight-medium">{{ item.title }} {{selectedRadio}}</span>
                    </div>
                    <img :src="item.img" alt="" height="20" />
                  </div>
                </template>
              </CustomRadios>
            </VCol>
            <VCol cols="12">
            <VCol cols="12" class="pt-2 pb-2 mb-2" style="background-color: #f1f5f9">
              <span><VIcon icon="tabler-info-circle" size="18"/> Add 50 USDT/USDC to cover SSF for smooth bot trading.</span>
            </VCol>
            </VCol>
          </VRow>
          <div class="mt-4 mb-2">
            <VCard class="pa-4" border>
              <!-- Fee Breakdown -->
              <VRow class="pt-4">
                <VCol cols="12" v-for="(item, index) in feeItems" :key="index" class="d-flex justify-space-between align-center pt-0">
                  <div class="text-sub-caption" :class="item.isTotal ? 'font-weight-bold' : ''">{{ item.label }}</div>
                  <div class="d-flex align-center">
                    <img :src="Frame" height="15" style="vertical-align: middle;"/>
                    <div  class="text-sub-caption" :class="item.isTotal ? 'font-weight-bold' : ''">  {{ item.amount }}</div>
                  </div>
                </VCol>
              </VRow>
            </VCard>
          </div>

          <VRow>
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
            <VBtn color="primary" @click="depositModal = true">Add</VBtn>
            <VBtn variant="outlined" class="ml-4" color="primary" @click="disable2FA = true">Disable 2FA</VBtn>
          </div>
        </VForm>

        <VDialog v-model="depositModal" max-width="500">
          <VCard class="pa-6 rounded-lg">
            <!-- Title & Close Button -->
            <div class="d-flex justify-end align-end">
              <VBtn icon="tabler-x" variant="text" @click="depositModal = false" />
            </div>
            <!-- Title & Close Button -->
            <div class="d-flex justify-center align-center mb-6">
              <h2>Deposit Amount</h2>
            </div>

            <!-- Amount -->
            <div class="text-center">
              <h2 class="text-3xl font-weight-bold text-primary">{{selectedRadio2}}</h2>
              <div class="text-sub-caption mb-6">{{selectedRadio}}</div>
            </div>

            <!-- QR Code -->
            <div class="d-flex justify-center mb-4"><img alt="" :src="QR" /></div>

            <!-- Address Validity -->
            <div class="text-center mb-3 text-sub-caption">
              <span class="text-error">*</span> Address valid for <strong>24 hours</strong>
            </div>

            <!-- Warning Text -->
            <div class="text-caption mb-4 text-center text-grey">
              <strong>Warning/Caution:</strong> This is a one-time wallet address that will expire.
              Do not re-deposit a second time to this temporary wallet address as you may lose your funds.
            </div>

            <!-- Wallet Address Box -->
            <div class="pa-3 rounded-lg bg-grey-lighten-4 d-flex align-center justify-space-between mb-6" style="background-color: #f1f5f9">
              <div class="text-sub-caption font-weight-bold">
                TLcK1jxtV3LW5ikugYXPUWgzXkKJfnnAyD
              </div>
              <VBtn icon="tabler-copy" size="small" @click="copyAddress">
              </VBtn>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-space-between">
              <VRow>
                <VCol cols="6">
                  <VBtn color="primary" block class="text-white" :to="{ name: 'my-wallet' }">
                    I Did The Payment
                  </VBtn>
                </VCol>
                <VCol cols="6">
                  <VBtn variant="outlined" block color="primary" @click="depositModal = false">
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </div>
          </VCard>
        </VDialog>

        <VDialog v-model="disable2FA" max-width="400">
          <VCard class="pa-6 rounded-lg">
            <div class="d-flex justify-end align-end">
              <VBtn icon="tabler-x" variant="text" @click="disable2FA = false" />
            </div>

            <div class="d-flex justify-center align-center mb-6">
              <VIcon icon="tabler-info-circle" size="40" color="error"/>
            </div>
            <div class="d-flex justify-center align-center mb-6">
              <h4 class="font-weight-bold">Please enable 2FA</h4>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-space-between">
              <VRow>
                <VCol cols="6">
                  <VBtn color="primary" block class="text-white" :to="{ name: 'account-settings-security' }">
                    Go To My Profile
                  </VBtn>
                </VCol>
                <VCol cols="6">
                  <VBtn variant="outlined" block color="primary" @click="disable2FA = false">
                    Do This Later
                  </VBtn>
                </VCol>
              </VRow>
            </div>
          </VCard>
        </VDialog>


      </VCardText>
    </VCard>
</template>

<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import { VForm } from 'vuetify/components/VForm'
import Frame from '@/assets/images/Frame.svg?url'
import Btc from '@/assets/images/btc.svg?url'
import Busd from '@/assets/images/busd.svg?url'
import Usdc from '@/assets/images/usdc.svg?url'
import QR from '@/assets/images/image18.png'

const depositModal = ref(false)
const disable2FA = ref(false)

const radioContent = [
  {
    title: 'USDT.TRC20',
    value: 'USDT.TRC20',
    img: Frame
  },
  {
    title: 'USDC.BSC',
    value: 'USDC.BSC',
    img : Usdc
  },
  {
    title: 'USDT.BEP20',
    value: 'USDT.BEP20',
    img : Busd
  },
  {
    title: 'USDC.SOL',
    value: 'USDC.SOL',
    img : Btc
  },
]

const selectedRadio = ref('USDT.TRC20')

const radioContent2 = [
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

const selectedRadio2 = ref('100')

const pageTitle = 'Deposit'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Wallet', to: '/my-wallet' },
  { title: 'Deposit' }
]

const agreed = ref(false)

const feeItems = [
  { label: 'Enter Amount', amount: selectedRadio2 },
  { label: 'Processing Fee', amount: '8.00' },
  { label: 'Recommend additional fund (Cover SSF)', amount: '50.00' },
  { label: 'Total included fees', amount: '158.00', isTotal: true },
]


const copyAddress = () => {
  navigator.clipboard.writeText('TLcK1jxtV3LW5ikugYXPUWgzXkKJfnnAyD')
  alert('Address copied to clipboard!')
}

const submitPayment = () => {
  alert('Payment submitted')
}
</script>

<style scoped>
::v-deep(.custom-radio .v-radio) {
  margin-block-start: 0rem;
}
::v-deep(.custom-radio) {
  margin: 0 !important;
  display: flex;
  align-items: center;
  height: 40px; /* Or any fixed height */
}
.custom-radio-item {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 1;
}
::v-deep( .v-label.custom-input) {
   padding: 0.5rem;
 }
</style>
