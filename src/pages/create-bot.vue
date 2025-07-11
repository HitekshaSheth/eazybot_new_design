<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import { VForm } from 'vuetify/components/VForm'
import Frame from '@/assets/images/Frame.svg?url'
import Btc from '@/assets/images/btc.svg?url'
import Busd from '@/assets/images/busd.svg?url'
import Usdc from '@/assets/images/usdc.svg?url'
import Sbs from '@/assets/images/Sbs.svg?url'
import Chart from '@/assets/images/chart-mixed.svg?url'

const numberedSteps = [
  {
    title: 'Bot Setup',
  },
  {
    title: 'Cover Configuration',
  }
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref()
const refPersonalForm = ref()
const refSocialLinkForm = ref()

const accountForm = ref({
  exchange: 'Select',
  email: '',
  password: '',
  cPassword: '',
})

const personalForm = ref({
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
})

const validateAccountForm = () => {
  refAccountForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validatePersonalForm = () => {
  refPersonalForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}


const pageTitle = 'Build Bot'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'Bots', to: '/bots' }
]

const radioContent = [
  {
    title: 'USDT',
    value: 'basic',
    img: Frame
  },
  {
    title: 'USDC',
    value: 'premium',
    img : Usdc
  },
  {
    title: 'BUSD',
    value: 'premium1',
    img : Busd
  },
  {
    title: 'BTC',
    value: 'premium2',
    img : Btc
  },
]

const selectedRadio = ref('basic')

const radioContent2 = [
  {
    title: 'SBS (Sliding BlockChain)',
    value: 'basic',
    img  : Sbs
  },
  {
    title: 'Moving Average',
    value: 'Moving Average',
    img : Chart
  },
]

const selectedRadio2 = ref('basic')
const initialOrder = ref(30)
const amount = ref(180)
const autoCompounding = ref(true)
const eazybotStrategy = ref(false)
const isVirtual = ref(false)
const multipleBots = ref(false)

const botForm = ref({
  title: '',
  baseCurrency: null,
  option: 'single',
  status: 'active',
  usdt: 600,
})
const optionCounter = ref(1)

function addBotRow() {
  // logic to handle row add
  console.log('Add bot', botForm.value)
}

const takeProfit = ref(600)
const profitRetracement = ref(600)

const sliding = ref({
  coverPercent: '-1.28',
  buyXTime: '0.14',
  pullback: '0.28',
  keepProfit: '50',
})

const covers = ref([
  {no : 1, cover: '-0.25', buyXTime: '0.14', amount: '5.8800$', pullback: '0.1', type: 'Average', keepProfit: '50' },
  {no : 2, cover: '-0.25', buyXTime: '0.14', amount: '5.8800$', pullback: '0.1', type: 'Average', keepProfit: '50' },
  {no : 3, cover: '-0.25', buyXTime: '0.14', amount: '5.8800$', pullback: '0.1', type: 'Average', keepProfit: '50' },
  {no : 4, cover: '-0.25', buyXTime: '0.14', amount: '5.8800$', pullback: '0.1', type: 'Average', keepProfit: '50' },
])

const coverHeaders = [
  { title: 'No.', value: 'no' },
  { title: 'Cover %', value: 'cover' },
  { title: 'Buy X time', value: 'buyXTime' },
  // { title: '', value: 'amount' },
  { title: 'Pullback', value: 'pullback' },
  { title: 'Type', value: 'type' },
  { title: 'Keep Profit (%)', value: 'keepProfit' },
  { title: '', value: 'actions', sortable: false },
]

function removeCover(index) {
  covers.value.splice(index, 1)
}

function goBack() {
  window.history.back()
}

function createBot() {
  alert('Bot Created!')
}

function bulkEdit() {
  alert('Bulk Edit triggered')
}

</script>
<style scoped>
.v-label.custom-input .custom-radio {
  height: 50px!important;
}
body .v-btn-group.v-btn-toggle .v-btn{
  block-size: 30px !important;
}
body .v-btn-group.v-btn-toggle.v-btn-group{
  height: 38px!important;
}
.v-btn--active{
  color: rgb(var(--v-theme-primary)) !important;
}
thead{
  background-color: #f5f8fb!important;
}
</style>
<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />

  <!-- Page content here -->
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="numberedSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refAccountForm"
            @submit.prevent="validateAccountForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Bot Setup
                </h6>
              </VCol>

              <VCol
                cols="12"
                md="7"
              >
                <VRow class="align-stretch">
                  <!-- Left Column -->
                  <VCol cols="12" md="7" class="d-flex flex-column justify-center">
                    <AppSelect
                      v-model="accountForm.exchange"
                      placeholder="Select"
                      label="Exchange"
                      :rules="[requiredValidator]"
                      :items="['Binance', 'KuCoin', 'Bitget', 'Kraken', 'Coinbase Advanced', 'Bybit', 'Coinbase Prime']"
                    />
                  </VCol>

                  <!-- Right Column: vertically centered, full height -->
                  <VCol cols="12" md="5" class="d-flex align-center justify-center">
                    <div class="d-flex align-center gap-2">
                      <span class="font-weight-medium">Assigned Balance</span>
                      <strong>11 BOT</strong>
                      <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                      <span class="text-caption font-weight-bold" style="color: green">75,000</span>
                    </div>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12">
                    <label>Quote Currency</label>
<!--                  <CustomRadios-->
<!--                    v-model:selected-radio="selectedRadio"-->
<!--                    :radio-content="radioContent"-->
<!--                    :grid-column="{ sm: '3', cols: '6' }"-->
<!--                  />-->
                    <CustomRadios
                      v-model:selected-radio="selectedRadio"
                      :radio-content="radioContent"
                      :grid-column="{ sm: '3', cols: '6' }"
                    >
                      <template #default="{ item, isSelected }">
                        <div class="d-flex align-center justify-space-between w-100">
                          <div>
                            <span class="font-weight-medium">{{ item.title }}</span>
                          </div>
                          <img :src="item.img" alt="" height="20" />
                        </div>
                      </template>
                    </CustomRadios>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12">
                    <label>Strategy</label>
<!--                  <CustomRadios-->
<!--                    v-model:selected-radio="selectedRadio2"-->
<!--                    :radio-content="radioContent2"-->
<!--                    :grid-column="{ sm: '6', cols: '12' }"-->
<!--                  />-->

                    <CustomRadios
                      v-model:selected-radio="selectedRadio2"
                      :radio-content="radioContent2"
                      :grid-column="{ sm: '6', cols: '12' }"
                    >
                      <template #default="{ item, isSelected }">
                        <div class="radio-item-fixed d-flex align-center justify-space-between w-100">
                          <div>
                            <span class="font-weight-medium">{{ item.title }}</span>
                          </div>
                          <img :src="item.img" alt="" height="20" />
                        </div>
                      </template>
                    </CustomRadios>
                  </VCol>
                </VRow>


              </VCol>

              <VCol
                cols="12"
                md="5"
              >
                <VRow>
                  <VCol cols="12">
                    <label>Initial Order</label>
                    <div class="d-flex justify-space-between">
                      <VSlider
                        v-model="initialOrder"
                        :max="100"
                        :step="1"
                      />
                    </div>
                    </VCol>
                  </VRow>
                <VRow>
                  <VCol cols="12" md="3">
                    <AppTextField
                      v-model="amount"
                      suffix="$"
                      type="number"
                      placeholder="10.05"
                    />
                    </VCol>
                  <VCol cols="12" md="6">

                    </VCol>

                  <VCol cols="12" md="3">
                    <VTextField
                      v-model="initialOrder"
                      type="number"
                      placeholder="10"
                      suffix="%"
                      :max="100"
                      style="max-inline-size: 5rem;"
                    />
                  </VCol>
                  </VRow>
                <VRow>
                  <div>
                      <VSwitch
                        v-model="autoCompounding"
                        label="Auto Compounding"
                      />
                      <VSwitch
                        v-model="eazybotStrategy"
                        label="Use the EazyBot Strategy?"
                      />
                    <VSwitch
                      v-model="isVirtual"
                      label="Is Virtual"
                    />
                    <VSwitch
                      v-model="multipleBots"
                      label="Create Multiple Bots"
                    />
                  </div>

                </VRow>

              </VCol>
              <VDivider />

              <VCardText>
                <template
                  v-for="i in optionCounter"
                  :key="i"
                >
                  <VRow>
                    <VCol cols="12" md="2">
                      <label>Title</label>
                      <VTextField
                        v-model="botForm.title"
                        placeholder="Bot name"
                        dense
                        outlined
                      />
                    </VCol>
                    <VCol cols="12" md="2">
                      <label>Base Currency</label>
                      <VSelect
                        v-model="botForm.baseCurrency"
                        label="Base Currency"
                        :items="['USDT', 'BTC', 'ETH']"
                        placeholder="Select"
                        dense
                        outlined
                      />
                    </VCol>

                    <!-- Bot Option -->
                    <VCol cols="12" md="2">
                      <label>Bot Option</label>
                      <VBtnToggle
                        v-model="botForm.option"
                        divided
                        mandatory
                      >
                        <VBtn value="cycle" variant="text">Cycle</VBtn>
                        <VBtn value="single" variant="text">Single</VBtn>
                      </VBtnToggle>
                    </VCol>

                    <!-- Status -->
                    <VCol cols="12" md="2">
                      <label>Status</label>
                      <VBtnToggle
                        v-model="botForm.status"
                        divided
                        mandatory
                      >
                        <VBtn value="active" color="primary" variant="text">Active</VBtn>
                        <VBtn value="inactive" variant="text">In-Active</VBtn>
                      </VBtnToggle>
                    </VCol>
                    <VCol cols="12" md="2">
                      <label>USDT Assigned</label>
                      <VTextField
                        v-model="botForm.usdt"
                        placeholder="USDT Assigned"
                        type="number"
                        dense
                        outlined
                      />
                    </VCol>

                    <VCol cols="12" md="2">
                      <VBtn
                        class="mt-6"
                        prepend-icon="tabler-plus"
                        @click="optionCounter++"
                      >
                      </VBtn>
                    </VCol>
                  </VRow>
                </template>
              </VCardText>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Back
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refPersonalForm"
            @submit.prevent="validatePersonalForm"
          >
            <VCard class="mb-4">
              <VCardTitle>Take Profit</VCardTitle>
              <VCardText>
                <VRow class="align-stretch">
                  <VCol cols="12" md="2"  class="d-flex flex-column justify-center">
                    <label>Take Profit</label>
                    <VTextField v-model="takeProfit" type="number" />
                  </VCol>
                  <VCol cols="12" md="2"  class="d-flex flex-column justify-center">
                    <label>Profit Re-tracement</label>
                    <VTextField v-model="profitRetracement" type="number" />
                  </VCol>
                  <VCol cols="12" md="8" class="d-flex flex-column justify-center" style="background-color: #f5f8fb;">
                    <VRow class="align-center">
                      <VCol cols="4" class="d-flex align-center">
                        <span>Expected Exchange Fee: <strong>0%</strong></span>
                        <div style="width: 1px; height: 24px; background-color: #ccc;margin-left: 40px;"></div>
                      </VCol>

                      <VCol cols="4" class="d-flex align-center">
                        <span>Expected SSF fees: <strong>0.25%</strong></span>
                      </VCol>

                      <VCol cols="4" class="d-flex align-center">
                        <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                        <span style="padding-left: 30px">Actual Take Profit: <strong>1.75%</strong></span>
                      </VCol>
                    </VRow>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <VCard class="mb-4">
              <VCardTitle>Sliding Cover Configuration</VCardTitle>
              <VCardText>
                <VRow>
                  <VCol cols="12" md="3">
                    <label>Cover %</label>
                    <VTextField v-model="sliding.coverPercent" label="" />
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Buy X Time</label>
                    <VTextField v-model="sliding.buyXTime" label="" />
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Pullback</label>
                    <VTextField v-model="sliding.pullback" label="" />
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Keep Profit (%)</label>
                    <VTextField v-model="sliding.keepProfit" label="" />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <!-- Covers Table -->
            <VCard class="mb-4">
              <VCardTitle>
                Covers
                <VSpacer />
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol Cols="11" md="11"></VCol>
                  <VCol Cols="1" md="1">
                    <VBtn variant="text" class="align-end text-right" append-icon="tabler-chevron-down" size="small" @click="bulkEdit">Bulk Edit</VBtn>
                  </VCol>
                  </VRow>
                <VRow>
                  <VDataTable
                    :headers="coverHeaders"
                    :items="covers"
                    class="elevation-1"
                    item-value="index"
                  >
                    <!-- Actions (Delete Icon) -->
                    <template #item.actions="{ index }">
                      <VIcon icon="tabler-trash-x" style="color: red; cursor: pointer" @click="removeCover(index)" />
                    </template>

                    <!-- Editable Cover % -->
                    <template #item.cover="{ item, index }">
                      <AppTextField
                        v-model="item.cover"
                        type="text"
                      />
                    </template>

                    <!-- Editable Buy X Time -->
                    <template #item.buyXTime="{ item, index }">
                      <AppTextField
                        v-model="item.buyXTime"
                        suffix="5.8800$"
                        type="number"
                      />
                    </template>

                    <!-- Editable Pullback -->
                    <template #item.pullback="{ item }">
                      <AppTextField
                        v-model="item.pullback"
                      />
                    </template>

                    <!-- Editable Keep Profit -->
                    <template #item.keepProfit="{ item }">
                      <AppTextField
                        v-model="item.keepProfit"
                      />
                    </template>

                    <!-- Type Toggle Buttons -->
                    <template #item.type="{ item }">
                      <VBtnToggle
                        v-model="item.type"
                        divided
                        mandatory
                      >
                        <VBtn value="Average" variant="text">Ave</VBtn>
                        <VBtn value="Independent" variant="text">Ind</VBtn>
                      </VBtnToggle>
                    </template>
                  </VDataTable>
                </VRow>
              </VCardText>
            </VCard>

            <VRow>
              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Back
                  </VBtn>

                  <VBtn type="submit">
                    Create
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

