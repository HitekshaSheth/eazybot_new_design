<script setup>
import { register } from 'swiper/element/bundle'
register()
import { useConfigStore } from '@core/stores/config'

import { ref, computed } from 'vue'
import Frame from '@/assets/images/Frame.svg?url'

const balance = ref(523.65)
const profitPercent = ref(50.15)
const activeTab = ref(0)
const search = ref('')
const page = ref(1)
const store = useConfigStore()
import paperPlane from '@images/visa.png'
import plane from '@images/visa.png'
import pricingPlanArrow from '@images/visa.png'
import shuttleRocket from '@images/visa.png'
import DepositDialog from '@/layouts/components/DepositDialog.vue'

const annualMonthlyPlanPriceToggler = ref(true)
const drawer = ref(false)
const submit = () => {
  // your submit logic
  drawer.value = false
}
const pricingPlans = [
  {
    title: 'Starter',
    image: paperPlane,
    monthlyPrice: 100,
    yearlyPrice: 168,
    features: [
      'Trade 5 Bots**',
      '1 Connections',
      'Group Support',
      'Referral Program',
      '-'
    ],
    supportType: 'Starter',
    supportMedium: 'Only Email',
    respondTime: 'AVG. Time: 24h',
    current: false,
  },
  {
    title: 'Advanced',
    image: plane,
    monthlyPrice: 29,
    yearlyPrice: 264,
    features: [
      'Trade 5 Bots**',
      '1 Connections',
      'Group Support',
      'Referral Program',
      '-'
    ],
    supportType: 'Standard',
    supportMedium: 'Email & Chat',
    respondTime: 'AVG. Time: 6h',
    current: true,
  },
  {
    title: 'Pro',
    image: shuttleRocket,
    monthlyPrice: 49,
    yearlyPrice: 444,
    features: [
      'Trade 5 Bots**',
      '1 Connections',
      'Group Support',
      'Referral Program',
      '-'
    ],
    supportType: 'Exclusive',
    supportMedium: 'Email, Chat & Google Meet',
    respondTime: 'Live Support',
    current: false,
  },
  {
    title: 'VIP',
    image: shuttleRocket,
    monthlyPrice: 49,
    yearlyPrice: 444,
    features: [
      'Trade 5 Bots**',
      '1 Connections',
      'Group Support',
      'Referral Program',
      '-'

    ],
    supportType: 'Exclusive',
    supportMedium: 'Email, Chat & Google Meet',
    respondTime: 'Live Support',
    current: false,
  },
  {
    title: 'VIP+',
    image: paperPlane,
    monthlyPrice: 19,
    yearlyPrice: 168,
    features: [
      'Trade 5 Bots**',
      '1 Connections',
      'Group Support',
      'Referral  Program',
      'Maximum ',

    ],
    supportType: 'Basic',
    supportMedium: 'Only Email',
    respondTime: 'AVG. Time: 24h',
    current: false,
  },
]
const presets = [100, 200, 500, 1000]
const selectedAmount = ref(null)
const agreed = ref(false)
const showDepositDialog = ref(false)

const displayAmount = computed(() => selectedAmount.value || 0)
const fee = computed(() => (displayAmount.value * 0.01).toFixed(2))
const recAdditional = computed(() => selectedAmount.value ? 50 : 0)
const total = computed(() => (displayAmount.value + +fee.value + recAdditional.value).toFixed(2))

function selectPreset(amt) {
  selectedAmount.value = amt
}
function onSubmit() {
  showDepositDialog.value = true
  drawer.value = false
  console.log('Submitting deposit:', {
    amount: displayAmount.value,
    fee: fee.value,
    additional: recAdditional.value,
    total: total.value
  })
  // API call or navigation here...
}

function openTerms() {
  window.open('/terms', '_blank')
}


</script>

<template>
  <VContainer>
    <VRow>
      <VCol md="6" cols="12">
        <VCard class="mb-4" title="Plan info">
          <template #append  style="padding-bottom: 0;">
            <VIcon icon="tabler-world-plus" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
          </template>
          <VCardText>
            <VRow align="center">
                  <h2 class="pl-2 pr-2">Pro </h2> <span class="text-caption">30 days left</span>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard class="mb-4" title="Available Balance" style="max-width: 100%">
          <template #append>
            <VIcon icon="tabler-wallet" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
          </template>
          <VCardText>
            <VRow align="center"><h2 class="pl-2 pr-2">$ 5.35</h2></VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <swiper-container v-if="mdAndUp"
      pagination="true"
      navigation="true"
      events-prefix="swiper-"
      slides-per-view="5"
      space-between="50"
      :breakpoints="{
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }"
    >
      <swiper-slide
        v-for="(plan, index) in pricingPlans"
        :key="index"
      >
        <VCard :style="plan.title == 'Pro' ? 'border:2px solid rgb(var(--v-theme-primary))' : ''">
          <VCardText class="pa-6 pt-5">
            <VImg
              :src="plan.image"
              width="55"
              height="55"
              class="mx-auto mb-4"
            />
            <div class="text-center mb-lg-5">
              <h4 class="text-h4 text-center">
                {{ plan.title }}
                <VChip v-if="plan.title == 'Pro'"
                       label
                       color="primary"
                       class="mb-4"
                       size="small"
                >
                  Most Popular
                </VChip>

              </h4>
              <span class="text-center text-disabled text-sm text-primary-300 ">Platform Access</span>

            </div>



            <div class="d-flex justify-center mb-lg-15 position-relative">
              <div class="d-flex align-end">
                <div class="pricing-title text-primary me-1">
                  ${{plan.monthlyPrice}}
                </div>
                <span class="text-disabled mb-2">/mo</span>
              </div>

              <!-- 👉 Annual Price -->
              <span
                v-show="annualMonthlyPlanPriceToggler"
                class="annual-price-text position-absolute text-sm text-disabled"
              >
                    Billed Annually
                  </span>

            </div>
            <div class="d-flex justify-center mb-lg-5 position-relative">
              <div class="d-flex align-end">
                <div class="text-primary text-sm font-weight-bold">
                  SOFTWARE SERVICE FEE (SSF)
                  <span class="text-disabled mb-2"> ‌0.4% of closing trade only
                                        Ex: $100 Closing Trade | $0.40 SSF</span>
                </div>
              </div>

            </div>
            <v-divider class="flex-grow-1 mb-lg-15"></v-divider>
            <VList class="card-list">
              <VListItem
                v-for="(item, i) in plan.features"
                :key="i"
              >
                <template #prepend>
                  <VAvatar v-if="item != '-'"
                           size="16"
                           :variant="!plan.current ? 'tonal' : 'elevated'"
                           color="primary"
                           class="me-3"
                  >
                    <VIcon
                      icon="tabler-check"
                      size="12"
                      :color="!plan.current ? 'primary' : 'white'"
                    />
                  </VAvatar>
                  <h6 class="text-h6">
                    {{ item }}
                  </h6>
                </template>
              </VListItem>
            </VList>
            <div class="d-flex justify-center">
              <VBtn
                @click="drawer = true"
                :variant="plan.title === 'Pro' ? 'elevated' : 'tonal'"
                class="mt-8"
              >
                Select
              </VBtn>
            </div>

          </VCardText>
        </VCard>


      </swiper-slide>
    </swiper-container>
    <swiper-container v-else
      pagination="true"
      navigation="true"
      events-prefix="swiper-"
      slides-per-view="5"
      space-between="50"
      :breakpoints="{
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }"
    >
      <swiper-slide
        v-for="(plan, index) in pricingPlans"
        :key="index"
      >
        <VCard :style="plan.title == 'Pro' ? 'border:2px solid rgb(var(--v-theme-primary))' : ''">
          <VCardText class="pa-6 pt-5">
            <VImg
              :src="plan.image"
              width="55"
              height="55"
              class="mx-auto mb-4"
            />
            <div class="text-center mb-2">
              <h4 class="text-h4 text-center">
                {{ plan.title }}
                <VChip v-if="plan.title == 'Pro'"
                       label
                       color="primary"
                       class="mb-4"
                       size="small"
                >
                  Most Popular
                </VChip>

              </h4>
              <span class="text-center text-disabled text-sm text-primary-300 ">Platform Access</span>

            </div>



            <div class="d-flex justify-center mb-8 position-relative">
              <div class="d-flex align-end">
                <div class="pricing-title text-primary me-1">
                  ${{plan.monthlyPrice}}
                </div>
                <span class="text-disabled mb-2">/mo</span>
              </div>

              <!-- 👉 Annual Price -->
              <span
                v-show="annualMonthlyPlanPriceToggler"
                class="annual-price-text position-absolute text-sm text-disabled"
              >
                    Billed Annually
                  </span>

            </div>
            <div class="d-flex justify-center mb-2 position-relative">
              <div class="d-flex align-end">
                <div class="text-primary text-sm font-weight-bold">
                  SOFTWARE SERVICE FEE (SSF)
                  <span class="text-disabled mb-2"> ‌0.4% of closing trade only
                                        Ex: $100 Closing Trade | $0.40 SSF</span>
                </div>
              </div>

            </div>
            <div class="mt-8 card-list">
              <VListItem
                v-for="(item, i) in plan.features"
                :key="i"
              >
                <template #prepend>
                  <VAvatar v-if="item != '-'"
                           size="16"
                           :variant="!plan.current ? 'tonal' : 'elevated'"
                           color="primary"
                           class="me-3"
                  >
                    <VIcon
                      icon="tabler-check"
                      size="12"
                      :color="!plan.current ? 'primary' : 'white'"
                    />
                  </VAvatar>
                  <h6 class="text-h6">
                    {{ item }}
                  </h6>
                </template>
              </VListItem>
            </div>
            <div class="d-flex justify-center">
              <VBtn
                @click="drawer = true"
                :variant="plan.title === 'Pro' ? 'elevated' : 'tonal'"
                class="mt-4 mb-4"
              >
                Select
              </VBtn>
            </div>

          </VCardText>
        </VCard>
      </swiper-slide>
    </swiper-container>

    <VNavigationDrawer
      v-model="drawer"
      location="right"
      temporary
      width="450"
      class="right-drawer"
    >
      <VToolbar flat>
        <VToolbarTitle>Deposit Balance</VToolbarTitle>
        <VSpacer />
        <VBtn class="text-primary" @click="drawer = false">
          <VIcon icon="tabler-square-rounded-x" />
        </VBtn>
      </VToolbar>
      <VDivider />
      <v-card class="pa-6">
        <!-- Secure Transfer Header -->
        <VChip class="d-flex align-left mb-6 text-primary">
          <VIcon
            icon="tabler-cloud-lock"
            class="flip-in-rtl text-primary me-1"
          />

          <span class="subtitle-2">Secure transfer</span>
        </VChip>

        <!-- Preset Buttons -->
        <div class="d-flex mb-8">
          <v-btn
            v-for="amt in presets"
            :key="amt"
            :class="{'ma-1': true}"
            :outlined="selectedAmount !== amt"
            :block="false"
            @click="selectPreset(amt)"
          >
            {{ amt }} ₮
          </v-btn>
        </div>

        <!-- Dropdown & Notice -->
        <v-select
          v-model="selectedAmount"
          :items="presets"
          label="Select amount"
          dense
          hide-details class="no-m mb-8"
        >
        </v-select>
        <div class="text-body-2 text--secondary my-2 mb-8">
          <VChip class="d-flex align-left mb-6 text-primary">
            <VIcon
              icon="tabler-access-point"
              class="flip-in-rtl text-sm text-primary me-1"
            />

            Add 50 USDT/USDC to cover SSF for smooth bot trading.
          </VChip>
        </div>

        <!-- Summary Box -->
        <v-sheet class="pa-4  mb-8 border rounded" elevation="1">
          <div class="d-flex justify-space-between mb-2">
            <span>Enter Amount</span><span>{{ displayAmount }} ₮</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span>Processing Fee</span><span>{{ fee }} ₮</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span>Recommend additional fund (Cover SSF)</span><span>{{ recAdditional }} ₮</span>
          </div>
          <div class="d-flex justify-space-between font-weight-bold">
            <span>Total included fees</span><span>{{ total }} ₮</span>
          </div>
        </v-sheet>

        <!-- Terms Checkbox -->
        <v-checkbox
          v-model="agreed"
          hide-details
          class="mb-8"
          label="I agree with terms and conditions. "
        >
          <template #label>
            I agree with terms and conditions
            <a href="#" @click.prevent="openTerms">&nbspClick here.</a>
          </template>
        </v-checkbox>

        <!-- Submit Button -->
        <v-btn
          :disabled="!agreed"
          color="primary"
          block
          @click="onSubmit"
        >
          Add
        </v-btn>
      </v-card>
    </VNavigationDrawer>
    <DepositDialog v-model="showDepositDialog" />

  </VContainer>

</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 12px;
}

#pricing-plan {
  border-radius: 3.75rem;
  background-color: rgb(var(--v-theme-background));
}

.pricing-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 52px;
}

.pricing-plans {
  margin-block: 5.25rem;
}

@media (max-width: 600px) {
  .pricing-plans {
    margin-block: 4rem;
  }
  swiper-container {
    --swiper-navigation-size: 22px !important;
  }
}

.save-upto-chip {
  inset-block-start: -1.5rem;
  inset-inline-end: -7rem;
}

.pricing-plan-arrow {
  inset-block-start: -0.5rem;
  inset-inline-end: -8rem;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
}

.section-title::after {
  position: absolute;
  background: url("../../../assets/images/front-pages/icons/section-title-icon.png") no-repeat left bottom;
  background-size: contain;
  block-size: 100%;
  content: "";
  font-weight: 700;
  inline-size: 120%;
  inset-block-end: 0;
  inset-inline-start: -12%;
}

.annual-price-text {
  inset-block-end: -40%;
}
</style>
