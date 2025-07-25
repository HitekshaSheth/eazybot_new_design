<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />
  <VRow  v-if="smAndDown">
    <VCol cols="12">
      <VCard class="mb-4">
        <VCardItem class="pb-0">
          <VCardTitle>Current Balance</VCardTitle>
          <template #append>
            <VIcon icon="tabler-wallet" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
          </template>
        </VCardItem>
        <VCardText>
          <VRow align="center" justify="space-between">
            <VCol>
              <div class="usdt">USDT Tether</div>
              <div class="d-flex align-center mt-2">
                <img :src="Frame"> <h2 class="wallet-balance pl-2 pr-2">{{ balance }}</h2>
                <VIcon icon="tabler-s-turn-up" size="22"  style="background-color: green"/>
                <span class="text-success" label>-{{ profitPercent }}%</span>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>

    </VCol>
    <VCol cols="12">
      <VCard>
        <!--      <VCardTitle>Deposit Balance</VCardTitle>-->
        <VCardText>
          <VForm
            ref="withdrawForm"
            @submit.prevent=""
          >
            <VRow>
              <VCol cols="12">
                <h3>Withdraw Balance</h3>
              </VCol>
              <VCol cols="12">
                <CustomRadios
                  v-model:selected-radio="selectedRadio"
                  :radio-content="radioContent"
                  :grid-column="{ sm: '3', cols: '6' }"
                >
                  <template #default="{ item, isSelected }">
                    <div class="d-flex align-center justify-space-between w-100  custom-radio-item" style="font-size: 0.8375rem">
                      <div>
                        <span class="font-weight-medium">{{ item.title }}</span>
                      </div>
                      <img :src="item.img" alt="" height="20" />
                    </div>
                  </template>
                </CustomRadios>
              </VCol>
              <VCol cols="12" md="4">
                  <label class="font-600">Withdraw Amount</label><br/>
                  <AppTextField
                    v-model="Amount"
                    type="number"
                  />
                </VCol>

              <VCol cols="12">
                <div class="mt-4 mb-2">
                  <VCard class="pa-4" border>
                    <!-- Fee Breakdown -->
                    <VRow class="pt-4">
                      <VCol cols="12" class="d-flex justify-space-between align-center pt-0">
                        <div class="text-sub-caption">Withdraw amount</div>
                        <div class="d-flex align-center">
                          <img :src="Frame" height="15" style="vertical-align: middle;"/>
                          <div  class="text-sub-caption">  {{ Amount }} .00</div>
                        </div>
                      </VCol>
                      <VCol cols="12" class="d-flex justify-space-between align-center pt-0">
                        <div class="text-sub-caption">Processing Fee</div>
                        <div class="d-flex align-center">
                          <img :src="Frame" height="15" style="vertical-align: middle;"/>
                          <div  class="text-sub-caption">  3.00</div>
                        </div>
                      </VCol>
                      <VCol cols="12" class="d-flex justify-space-between align-center pt-0">
                        <div class="text-sub-caption font-weight-bold">Total included fees</div>
                        <div class="d-flex align-center">
                          <img :src="Frame" height="15" style="vertical-align: middle;"/>
                          <div  class="text-sub-caption font-weight-bold">  {{ parseInt(Amount) + 3 }} .00</div>
                        </div>
                      </VCol>
                    </VRow>
                  </VCard>
                </div>
              </VCol>
              <VCol cols="12">
                <label class="font-600">Crypto wallet address <span class="text-caption">({{selectedRadio}})</span></label><br/>
                <AppTextField
                  v-model="address"
                  placeholder="asasd34jkae34bjhjb32l3n23kjhkjkjb23b4jh2v2kjkjsjdf34kjnsdf"
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
              <VBtn color="primary" @click="withdrawModal = true">Withdraw</VBtn>
            </div>
          </VForm>
          <VDialog v-model="withdrawModal" max-width="550" style="position: sticky;">
            <VCard class="pa-6 rounded-lg">
              <!-- Title & Close Button -->
              <div class="d-flex justify-end align-end">
                <VBtn icon="tabler-x" variant="text" @click="withdrawModal = false" />
              </div>
              <!-- Title & Close Button -->
              <div class="d-flex justify-center align-center mb-6">
                <h2>Security Verification</h2>
              </div>

              <!-- Withdrawal Password -->
              <label class="pb-2">Withdrawal Password</label>
              <VTextField
                v-model="withdrawalPassword"
                type="password"
                hide-details
                class="mb-4"
                dense
              />

              <!-- Email Message -->
              <div class="text-sub-caption text-center mb-2">
                Enter the 6-digit verification code you have received on your email
                <span class="text-primary text-center font-weight-medium">vikas******1990@gmail.com</span><br/>
                <label class=" font-600 pb-2">Verification Code</label><br/>
              </div>

              <!-- Email Code Inputs -->
              <VRow>
                <VCol cols="2"></VCol>
                <VCol cols="8">
                  <div class="d-flex justify-center gap-2 mb-2">
                    <VTextField
                      v-for="n in 6"
                      :key="'email-code-' + n"
                      v-model="emailCodes[n - 1]"
                      maxlength="1"
                      class="text-center"
                      type="text"
                      hide-details
                      style="width: 22px;"
                    />
                  </div>
                </VCol>
                <VCol cols="2"></VCol>
              </VRow>


              <!-- Resend Timer -->
              <div class="text-center text-primary text-caption mb-3">
                Resend code ({{ countdown }}s)
              </div>

              <VDivider class="my-4" />

              <!-- Authenticator Code -->
              <div class="text-sub-caption text-center mt-2  mb-2">
              <label class=" font-600 pb-2">Authenticator Code</label>
              </div>
              <VRow>
                <VCol cols="2"></VCol>
                <VCol cols="8">
                  <div class="d-flex justify-center gap-2 mb-2">
                    <VTextField
                      v-for="n in 6"
                      :key="'auth-code-' + n"
                      v-model="authCodes[n - 1]"
                      maxlength="1"
                      class="text-center"
                      type="text"
                      hide-details
                      style="width: 22px;"
                    />
                  </div>
                </VCol>
                <VCol cols="2"></VCol>
              </VRow>

              <div class="text-sub-caption text-center mb-6">
                Enter the 6-digit code from Google authenticator
              </div>

              <!-- Buttons -->
              <div class="d-flex justify-space-between">
                <VRow>
                  <VCol cols="6">
                    <VBtn color="primary" block class="text-white" :to="{ name: 'my-wallet' }">
                      Submit
                    </VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn variant="outlined" block color="primary" @click="withdrawModal = false">
                      Cancel
                    </VBtn>
                  </VCol>
                </VRow>
              </div>
            </VCard>
          </VDialog>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow  v-else>
    <VCol cols="12" md="8">
      <VCard>
        <!--      <VCardTitle>Deposit Balance</VCardTitle>-->
        <VCardText>
          <VForm
            ref="withdrawForm"
            @submit.prevent=""
          >
            <VRow>
              <VCol cols="12">
                <h3>Withdraw Balance</h3>
              </VCol>
              <VCol cols="12">
                <CustomRadios
                  v-model:selected-radio="selectedRadio"
                  :radio-content="radioContent"
                  :grid-column="{ sm: '3', cols: '6' }"
                >
                  <template #default="{ item, isSelected }">
                    <div class="d-flex align-center justify-space-between w-100  custom-radio-item" style="font-size: 0.8375rem">
                      <div>
                        <span class="font-weight-medium">{{ item.title }}</span>
                      </div>
                      <img :src="item.img" alt="" height="20" />
                    </div>
                  </template>
                </CustomRadios>
              </VCol>
              <VCol cols="12" md="4">
                  <label class="font-600">Withdraw Amount</label><br/>
                  <AppTextField
                    v-model="Amount"
                    type="number"
                  />
                </VCol>
              <VCol md="3" style="margin-top: auto;margin-bottom: auto;">
                <VIcon icon="tabler-transform" size="22" /><span class="pl-2" style="font-size: 12px"><span class="text-success font-weight-bold" >{{Amount + 3 }}.00</span> {{selectedRadio}}</span>
              </VCol>
              <VCol md="3" style="margin-top: auto;margin-bottom: auto;">
                <VIcon icon="tabler-receipt-dollar" size="22" /><span class="pl-2" style="font-size: 12px"><span class="text-error font-weight-bold" >3.00 </span> {{selectedRadio}}</span>
              </VCol>
              <VCol cols="12">
                <label class="font-600">Crypto wallet address <span class="text-caption">({{selectedRadio}})</span></label><br/>
                <AppTextField
                  v-model="address"
                  placeholder="asasd34jkae34bjhjb32l3n23kjhkjkjb23b4jh2v2kjkjsjdf34kjnsdf"
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
              <VBtn color="primary" @click="withdrawModal = true">Withdraw</VBtn>
            </div>
          </VForm>
          <VDialog v-model="withdrawModal" max-width="550">
            <VCard class="pa-6 rounded-lg">
              <!-- Title & Close Button -->
              <div class="d-flex justify-end align-end">
                <VBtn icon="tabler-x" variant="text" @click="withdrawModal = false" />
              </div>
              <!-- Title & Close Button -->
              <div class="d-flex justify-center align-center mb-6">
                <h2>Security Verification</h2>
              </div>

              <!-- Withdrawal Password -->
              <label class="pb-2">Withdrawal Password</label>
              <VTextField
                v-model="withdrawalPassword"
                type="password"
                hide-details
                class="mb-4"
                dense
              />

              <!-- Email Message -->
              <div class="text-sub-caption text-center mb-2">
                Enter the 6-digit verification code you have received on your email
                <span class="text-primary text-center font-weight-medium">vikas******1990@gmail.com</span><br/>
                <label class=" font-600 pb-2">Verification Code</label><br/>
              </div>

              <!-- Email Code Inputs -->
              <VRow>
                <VCol cols="2"></VCol>
                <VCol cols="8">
                  <div class="d-flex justify-center gap-5 mb-2">
                    <VTextField
                      v-for="n in 6"
                      :key="'email-code-' + n"
                      v-model="emailCodes[n - 1]"
                      maxlength="1"
                      class="text-center"
                      type="text"
                      hide-details
                      style="width: 12px;"
                    />
                  </div>
                </VCol>
                <VCol cols="2"></VCol>
              </VRow>


              <!-- Resend Timer -->
              <div class="text-center text-primary text-caption mb-3">
                Resend code ({{ countdown }}s)
              </div>

              <VDivider class="my-4" />

              <!-- Authenticator Code -->
              <div class="text-sub-caption text-center mt-2  mb-2">
              <label class=" font-600 pb-2">Authenticator Code</label>
              </div>
              <VRow>
                <VCol cols="2"></VCol>
                <VCol cols="8">
                  <div class="d-flex justify-center gap-5 mb-2">
                    <VTextField
                      v-for="n in 6"
                      :key="'auth-code-' + n"
                      v-model="authCodes[n - 1]"
                      maxlength="1"
                      class="text-center"
                      type="text"
                      hide-details
                      style="width: 12px;"
                    />
                  </div>
                </VCol>
                <VCol cols="2"></VCol>
              </VRow>

              <div class="text-sub-caption text-center mb-6">
                Enter the 6-digit code from Google authenticator
              </div>

              <!-- Buttons -->
              <div class="d-flex justify-space-between">
                <VRow>
                  <VCol cols="6">
                    <VBtn color="primary" block class="text-white" :to="{ name: 'my-wallet' }">
                      Submit
                    </VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn variant="outlined" block color="primary" @click="withdrawModal = false">
                      Cancel
                    </VBtn>
                  </VCol>
                </VRow>
              </div>
            </VCard>
          </VDialog>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard class="mb-4">
        <VCardItem class="pb-0">
          <VCardTitle>Current Balance</VCardTitle>
          <template #append>
            <VIcon icon="tabler-wallet" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
          </template>
        </VCardItem>
        <VCardText>
          <VRow align="center" justify="space-between">
            <VCol>
              <div class="usdt">USDT Tether</div>
              <div class="d-flex align-center mt-2">
                <img :src="Frame"> <h2 class="wallet-balance pl-2 pr-2">{{ balance }}</h2>
                <VIcon icon="tabler-s-turn-up" size="22"  style="background-color: green"/>
                <span class="text-success" label>-{{ profitPercent }}%</span>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>

    </VCol>
  </VRow>


</template>

<script setup>
import {onMounted } from 'vue'
import AppPageHeader from '@/components/AppPageHeader.vue'
import { VForm } from 'vuetify/components/VForm'
import Frame from '@/assets/images/Frame.svg?url'
import Btc from '@/assets/images/btc.svg?url'
import Busd from '@/assets/images/busd.svg?url'
import Usdc from '@/assets/images/usdc.svg?url'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const pageTitle = 'Withdraw'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'My Wallet', to: '/my-wallet' },
  { title: 'Withdraw' }
]
const balance = ref(523.65)
const profitPercent = ref(50.15)

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
const agreed = ref(false)
const withdrawModal = ref(false)
const Amount = ref('100')
const address = "asasd34jkae34bjhjb32l3n23kjhkjkjb23b4jh2v2kjkjsjdf34kjnsdf"
const withdrawalPassword = ref('')
const emailCodes = ref(['', '', '', '', '', ''])
const authCodes = ref(['', '', '', '', '', ''])

const countdown = ref(82)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
    else clearInterval(timer)
  }, 1000)
})

// const submit = () => {
//   const emailCode = emailCodes.value.join('')
//   const authCode = authCodes.value.join('')
//   console.log('Submitting:', {
//     withdrawalPassword: withdrawalPassword.value,
//     emailCode,
//     authCode,
//   })
//   // Add your logic here...
// }
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
.font-600{
  font-weight: 600!important;
}
::v-deep(.v-field__input){
  padding-inline: 12px!important;
}
@media (max-width: 490px) {
  ::v-deep(.v-overlay__content) {
    position: sticky;
    width: 100% !important;
    margin : 0 !important;
  }
  ::v-deep(.v-overlay__content > .v-card) {
    border-radius: 20px!important;
  }
  ::v-deep(.v-selection-control--density-comfortable) {
    --v-selection-control-size: 25px!important;
  }
  .custom-radio-item{
    font-size: 12px!important;
  }
  .text-caption{
    font-size: 12px!important;
  }
  .text-sub-caption{
    font-size: 13px!important;
  }
}
</style>

