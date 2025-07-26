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


</script>

<template>
<VContainer>
    <VRow>
        <VCol md="4" cols="12">
            <VCard class="mb-4" title="Current Balance" style="max-width: 100%">
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

                    </VRow>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>

  <swiper-container
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
                       <VCard :style="plan.title == 'VIP' ? 'border:2px solid rgb(var(--v-theme-primary))' : ''">
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
                                       Current Plan
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
