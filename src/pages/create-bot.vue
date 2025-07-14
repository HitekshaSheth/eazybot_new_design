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
const isCurrentStepValid = ref(true)
const refAccountForm = ref()
const refPersonalForm = ref()

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

const createBotForm = data => ({
  title: data?.title || '',
  baseCurrency: data?.baseCurrency || null,
  option: data?.option || 'single',
  status: data?.status || 'active',
  usdt: data?.usdt || 600,
})

// Initialize with one row
const botForms = ref([createBotForm()])

// Add a new row by cloning an existing one
function addBotRow(index) {
  const copied = createBotForm(botForms.value[index])
  botForms.value.push(copied)
}

// Remove row unless it's the last one
function removeBotRow(index) {
  if (botForms.value.length > 1) {
    botForms.value.splice(index, 1)
  }
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

const selected = ref([])

const showBulkModal = ref(false)

const bulkForm = ref({
  cover: '-0.25',
  buyXTime: '0.14',
  pullback: '0.1',
  keepProfit: '50',
  type: 'Average',
})

function duplicateCover(item) {
  const newRow = { ...item }
  newRow.no = covers.value.length + 1
  covers.value.push(newRow)
}

function removeCover(index) {
  covers.value.splice(index, 1)
  covers.value.forEach((row, i) => row.no = i + 1)
}

function applyBulkEdit() {
  selected.value.forEach(rowNo => {
    const row = covers.value.find(r => r.no === rowNo)
    if (row) {
      if (bulkForm.value.cover !== '') row.cover = bulkForm.value.cover
      if (bulkForm.value.buyXTime !== '') row.buyXTime = bulkForm.value.buyXTime
      if (bulkForm.value.pullback !== '') row.pullback = bulkForm.value.pullback
      if (bulkForm.value.keepProfit !== '') row.keepProfit = bulkForm.value.keepProfit
      if (bulkForm.value.type !== '') row.type = bulkForm.value.type
    }
  })

  // Reset modal
  bulkForm.value = {
    cover: '',
    buyXTime: '',
    pullback: '',
    keepProfit: '',
    type: '',
  }
  showBulkModal.value = false
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
::v-deep(.v-slider.v-input--horizontal) {
  margin-inline: unset!important;
}
::v-deep(.custom-radio .v-radio) {
    margin-block-start: 0rem;
}
::v-deep(.custom-radio) {
  margin: 0 !important;
  display: flex;
  align-items: center;
  height: 40px; /* Or any fixed height */
}
label{
  color: #334155;
}
.custom-radio-item {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 1;
}
.divider-vertical {
  height: 24px;
  width: 1px;
  background-color: #dbe3eb;
  margin: 0 24px;
}
.flex-1 {
  flex: 1;
}
body .v-btn-group.v-btn-toggle .v-btn{
  block-size: auto!important;
  inline-size: auto!important;
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
                    <label>Exchange</label>
                    <AppSelect
                      v-model="accountForm.exchange"
                      placeholder="Select"
                      :rules="[requiredValidator]"
                      :items="['Binance', 'KuCoin', 'Bitget', 'Kraken', 'Coinbase Advanced', 'Bybit', 'Coinbase Prime']"
                    />
                  </VCol>

                  </VRow>
                  <VRow>
                  <!-- Right Column: vertically centered, full height -->
                  <VCol cols="12" md="12" class="d-flex">
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
                        <div class="d-flex align-center justify-space-between w-100  custom-radio-item">
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
                class="pl-15"
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
                  <VCol cols="12" md="4">
                    <AppTextField
                      v-model="amount"
                      suffix="$"
                      type="number"
                      placeholder="10.05"
                    />
                    </VCol>
                  <VCol cols="12" md="5">

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
                    <VCol cols="12" class="pt-0 pb-0">
                      <VSwitch
                        v-model="autoCompounding"
                        label="Auto Compounding"
                      />
                    </VCol>
                    <VCol cols="12" class="pt-0 pb-0">
                      <VSwitch
                        v-model="eazybotStrategy"
                        label="Use the EazyBot Strategy?"
                      />
                    </VCol>
                    <VCol cols="12" class="pt-0 pb-0">
                    <VSwitch
                      v-model="isVirtual"
                      label="Is Virtual"
                    />
                    </VCol>
                    <VCol cols="12" class="pt-0 pb-0">
                    <VSwitch
                      v-model="multipleBots"
                      label="Create Multiple Bots"
                    />
                    </VCol>
                  </div>

                </VRow>

              </VCol>
<!--              <VDivider />-->

<!--              <VCardText>-->
<!--                <template v-for="(botForm, index) in botForms" :key="index">-->
<!--                  <VRow>-->
<!--                    <VCol cols="12" md="2">-->
<!--                      <label>Title</label>-->
<!--                      <VTextField-->
<!--                        v-model="botForm.title"-->
<!--                        placeholder="Bot name"-->
<!--                        dense-->
<!--                        outlined-->
<!--                      />-->
<!--                    </VCol>-->

<!--                    <VCol cols="12" md="2">-->
<!--                      <label>Base Currency</label>-->
<!--                      <VSelect-->
<!--                        v-model="botForm.baseCurrency"-->
<!--                        :items="['USDT', 'BTC', 'ETH']"-->
<!--                        placeholder="Select"-->
<!--                        dense-->
<!--                        outlined-->
<!--                      />-->
<!--                    </VCol>-->

<!--                    <VCol cols="12" md="2">-->
<!--                      <label>Bot Option</label>-->
<!--                      <VBtnToggle v-model="botForm.option" divided mandatory>-->
<!--                        <VBtn value="cycle" variant="text">Cycle</VBtn>-->
<!--                        <VBtn value="single" variant="text">Single</VBtn>-->
<!--                      </VBtnToggle>-->
<!--                    </VCol>-->

<!--                    <VCol cols="12" md="3">-->
<!--                      <label>Status</label>-->
<!--                      <br/>-->
<!--                      <VBtnToggle v-model="botForm.status" divided mandatory>-->
<!--                        <VBtn value="active" color="primary" variant="text">Active</VBtn>-->
<!--                        <VBtn value="inactive" variant="text">In-Active</VBtn>-->
<!--                      </VBtnToggle>-->
<!--                    </VCol>-->

<!--                    <VCol cols="12" md="2">-->
<!--                      <label>USDT Assigned</label>-->
<!--                      <VTextField-->
<!--                        v-model="botForm.usdt"-->
<!--                        placeholder="USDT Assigned"-->
<!--                        type="number"-->
<!--                        dense-->
<!--                        outlined-->
<!--                      />-->
<!--                    </VCol>-->

<!--                    <VCol cols="12" md="1" class="d-flex align-end" v-if="multipleBots == true">-->
<!--                      <VBtn-->
<!--                        class="mt-6"-->
<!--                        :icon="index === botForms.length - 1 ? 'tabler-copy' : 'tabler-x'"-->
<!--                        :color="index === botForms.length - 1 ? 'primary' : 'error'"-->
<!--                        variant="outlined"-->
<!--                        @click="index === botForms.length - 1 ? addBotRow(index) : removeBotRow(index)"-->
<!--                      />-->
<!--                    </VCol>-->
<!--                  </VRow>-->
<!--                </template>-->
<!--              </VCardText>-->
              <VDivider />

              <VCardText>
                <VTable>
                  <thead>
                  <tr>
                    <th style="width: 20%">Title</th>
                    <th style="width: 20%">Base Currency</th>
                    <th style="width: 15%">Bot Option</th>
                    <th style="width: 15%">Status</th>
                    <th style="width: 20%">USDT Assigned</th>
                    <th v-if="multipleBots" style="width: 10%">Actions</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr v-for="(botForm, index) in botForms" :key="index">
                    <!-- Title -->
                    <td>
                      <VTextField
                        v-model="botForm.title"
                        placeholder="Bot name"
                        dense
                        variant="outlined"
                      />
                    </td>

                    <!-- Base Currency -->
                    <td>
                      <VSelect
                        v-model="botForm.baseCurrency"
                        :items="['USDT', 'BTC', 'ETH']"
                        placeholder="Select"
                        dense
                        variant="outlined"
                      />
                    </td>

                    <!-- Bot Option -->
                    <td>
                      <VBtnToggle v-model="botForm.option" divided mandatory>
                        <VBtn value="cycle" variant="text">Cycle</VBtn>
                        <VBtn value="single" variant="text">Single</VBtn>
                      </VBtnToggle>
                    </td>

                    <!-- Status -->
                    <td>
                      <VBtnToggle v-model="botForm.status" divided mandatory>
                        <VBtn value="active" color="primary" variant="text">Active</VBtn>
                        <VBtn value="inactive" variant="text">In-Active</VBtn>
                      </VBtnToggle>
                    </td>

                    <!-- USDT Assigned -->
                    <td>
                      <VTextField
                        v-model="botForm.usdt"
                        type="number"
                        placeholder="USDT Assigned"
                        dense
                        variant="outlined"
                      />
                    </td>

                    <!-- Actions -->
                    <td v-if="multipleBots">
                      <VBtn
                        :icon="index === botForms.length - 1 ? 'tabler-copy' : 'tabler-x'"
                        :color="index === botForms.length - 1 ? 'primary' : 'error'"
                        variant="outlined"
                        @click="index === botForms.length - 1 ? addBotRow(index) : removeBotRow(index)"
                      />
                    </td>
                  </tr>
                  </tbody>
                </VTable>

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
                    <VTextField v-model="takeProfit" type="number" :disabled="eazybotStrategy"/>
                  </VCol>
                  <VCol cols="12" md="2"  class="d-flex flex-column justify-center">
                    <label>Profit Re-tracement</label>
                    <VTextField v-model="profitRetracement" type="number" :disabled="eazybotStrategy"/>
                  </VCol>
                  <VCol cols="12" md="8" class="d-flex flex-column justify-center" style="background-color: #f5f8fb;margin-top: 12px;margin-bottom: 12px;border-radius: 6px">
<!--                    <VCard flat class="py-3 px-4">-->
                      <div class="d-flex align-center justify-space-between text-center w-100">
                        <!-- Item 1 -->
                        <div class="flex-1 d-flex align-center justify-center">
                          <span>Expected Exchange Fee&nbsp;<strong>0%</strong></span>
                        </div>

                        <!-- Divider -->
                        <div class="divider-vertical" />

                        <!-- Item 2 -->
                        <div class="flex-1 d-flex align-center justify-center">
                          <span>Expected SSF fees&nbsp;<strong>0.25%</strong></span>
                        </div>

                        <!-- Divider -->
                        <div class="divider-vertical" />

                        <!-- Item 3 -->
                        <div class="flex-1 d-flex align-center justify-center">
                          <span>Actual Take Profit&nbsp;<strong>1.75%</strong></span>
                        </div>
                      </div>
<!--                    </VCard>-->

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
                    <VTextField v-model="sliding.coverPercent" label="" :disabled="eazybotStrategy"/>
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Buy X Time</label>
                    <VTextField v-model="sliding.buyXTime" label="" :disabled="eazybotStrategy"/>
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Pullback</label>
                    <VTextField v-model="sliding.pullback" label="" :disabled="eazybotStrategy"/>
                  </VCol>
                  <VCol cols="12" md="3">
                    <label>Keep Profit (%)</label>
                    <VTextField v-model="sliding.keepProfit" label="" :disabled="eazybotStrategy"/>
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
                  <VCol cols="11" md="11" />
                  <VCol cols="1" md="1" class="text-right">
                    <VBtn
                      variant="text"
                      append-icon="tabler-chevron-down"
                      size="small"
                      :disabled="selected.length === 0"
                      @click="showBulkModal = true"
                    >
                      Bulk Edit
                    </VBtn>
                  </VCol>
                </VRow>

                <VRow>
                  <VDataTable
                    v-model="selected"
                    :headers="coverHeaders"
                    :items="covers"
                    item-value="no"
                    show-select
                    class="elevation-1"
                  >
                    <!-- Delete -->
<!--                    <template #item.actions="{ index }">-->
<!--                      <VIcon icon="tabler-trash-x" style="color: red; cursor: pointer" @click="removeCover(index)" />-->
<!--                    </template>-->

                    <template #item.actions="{ item, index }">
                      <VIcon :disabled="eazybotStrategy"
                        :icon="index === covers.length - 1 ? 'tabler-plus' : 'tabler-trash-x'"
                        :color="index === covers.length - 1 ? 'primary' : 'red'"
                        style="cursor: pointer"
                        @click="index === covers.length - 1 ? duplicateCover(item) : removeCover(index)"
                      />
                    </template>

                    <!-- Editable Fields -->
                    <template #item.cover="{ item }">
                      <AppTextField v-model="item.cover" :disabled="eazybotStrategy"/>
                    </template>

                    <template #item.buyXTime="{ item }">
                      <AppTextField v-model="item.buyXTime" suffix="5.8800$" :disabled="eazybotStrategy"/>
                    </template>

                    <template #item.pullback="{ item }">
                      <AppTextField v-model="item.pullback" :disabled="eazybotStrategy"/>
                    </template>

                    <template #item.keepProfit="{ item }">
                      <AppTextField v-model="item.keepProfit" :disabled="eazybotStrategy"/>
                    </template>

                    <template #item.type="{ item }">
                      <VBtnToggle v-model="item.type" divided mandatory :disabled="eazybotStrategy">
                        <VBtn value="Average" variant="text">Average</VBtn>
                        <VBtn value="Independent" variant="text">Independent</VBtn>
                      </VBtnToggle>
                    </template>
                  </VDataTable>

                  <!-- Bulk Edit Modal -->
                  <VDialog v-model="showBulkModal" max-width="600">
                    <VCard>
                      <VCardTitle>Bulk Edit Selected Rows</VCardTitle>
                      <VCardText>
                        <VRow>
                          <VCol cols="12" sm="6">
                            <AppTextField v-model="bulkForm.cover" label="Cover %" />
                          </VCol>
                          <VCol cols="12" sm="6">
                            <AppTextField v-model="bulkForm.buyXTime" label="Buy X Time" suffix="5.8800$" />
                          </VCol>
                          <VCol cols="12" sm="6">
                            <AppTextField v-model="bulkForm.pullback" label="Pullback" />
                          </VCol>
                          <VCol cols="12" sm="6">
                            <AppTextField v-model="bulkForm.keepProfit" label="Keep Profit (%)" />
                          </VCol>
                          <VCol cols="12">
                            <label class="mb-2 d-block">Type</label>
                            <VBtnToggle v-model="bulkForm.type" divided mandatory>
                              <VBtn value="Average" variant="text">Average</VBtn>
                              <VBtn value="Independent" variant="text">Independent</VBtn>
                            </VBtnToggle>
                          </VCol>
                        </VRow>
                      </VCardText>
                      <VCardActions>
                        <VSpacer />
                        <VBtn text @click="showBulkModal = false">Cancel</VBtn>
                        <VBtn color="primary" @click="applyBulkEdit">Apply</VBtn>
                      </VCardActions>
                    </VCard>
                  </VDialog>
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

