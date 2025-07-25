<script setup>
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
        <div class="">
            <VRow>
                <VCol cols="12">
                    <VCard>

                        <VCardText>
                            <VRow>
                                <VCol cols="12"
                                         md="8"
                                >
                                    <div>
                                        <div class="mb-6">
                                            <h2 class="text-body-1 text-primary text-high-emphasis font-weight-bold mb-1">
                                                45 Days - FREE TRIAL
                                            </h2>
                                        </div>


                                        <div>
                                            <h3 class="text-body-1 text-high-emphasis font-weight-medium mb-1">
                                                <span class="me-2">Platform Access</span>
                                                <!--<VChip-->
                                                        <!--color="primary"-->
                                                        <!--size="small"-->
                                                        <!--label-->
                                                <!--&gt;-->
                                                    <!--Popular-->
                                                <!--</VChip>-->
                                            </h3>

                                            <div class="text-primary text-sm font-weight-bold text-base mb-0">
                                                SOFTWARE SERVICE FEE (SSF)
                                                <p class="text-disabled mb-2"> ‌0.4% of closing trade only
                                        Ex: $100 Closing Trade | $0.40 SSF</p>
                                            </div>
                                        </div>
                                    </div>
                                </VCol>
                                <VCol  cols="12"  md="4"
                                      >
                                    <VList class="card-list">
                                        <VListItem
                                        >
                                            <template #prepend>
                                                <VAvatar
                                                         size="16"
                                                         color="primary"
                                                         class="me-3"
                                                >
                                                    <VIcon
                                                            icon="tabler-check"
                                                            size="12"
                                                            :color="primary"
                                                    />
                                                </VAvatar>
                                                <h5 class="text-h5">                                                    2 Trade Bots
                                                </h5>
                                            </template>
                                        </VListItem>
                                        <VListItem
                                        >
                                            <template #prepend>
                                                <VAvatar
                                                        size="16"
                                                        color="primary"
                                                        class="me-3"
                                                >
                                                    <VIcon
                                                            icon="tabler-check"
                                                            size="12"
                                                            :color="primary"
                                                    />
                                                </VAvatar>
                                                <h5 class="text-h5">
                                                    2 Trade Bots
                                                </h5>
                                            </template>
                                        </VListItem>
                                        <VListItem
                                        >
                                            <template #prepend>
                                                <VAvatar
                                                        size="16"
                                                        color="primary"
                                                        class="me-3"
                                                >
                                                    <VIcon
                                                            icon="tabler-check"
                                                            size="12"
                                                            :color="primary"
                                                    />
                                                </VAvatar>
                                                <h5 class="text-h5">                                                    2 Trade Bots
                                                </h5>
                                            </template>
                                        </VListItem>
                                    </VList>
                                </VCol>
                                <VCol cols="12">
                                    <div class="d-flex flex-wrap gap-4">
                                        <VBtn >
                                            Get Started
                                        </VBtn>
                                    </div>
                                    </VCol>

                            </VRow>

                            <!-- 👉 plan and pricing dialog -->
                            <PricingPlanDialog v-model:is-dialog-visible="isPricingPlanDialogVisible" />
                        </VCardText>
                    </VCard>
                </VCol>


            </VRow>
            <!-- 👉 Headers  -->
            <!--<div class="headers d-flex justify-center flex-column align-center flex-wrap">-->
            <!--<VChip-->
            <!--label-->
            <!--color="primary"-->
            <!--class="mb-4"-->
            <!--size="small"-->
            <!--&gt;-->
            <!--Pricing Plans-->
            <!--</VChip>-->

            <!--</div>-->
            <!-- 👉 Annual and monthly price toggler -->
            <VRow>
                <VCol
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
                            <VBtn
                                    @click="drawer = true"
                                    block
                                    :variant="plan.title == 'Pro'  ? 'elevated' : 'tonal'"
                                    class="mt-8"

                            >
                                Select
                            </VBtn>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </div>
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
                <VBtn class="text-primary"icon @click="drawer = false">
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
            <!--<VCardActions>-->
                <!--<VSpacer />-->
                <!--<VBtn color="primary" @click="submit">Submit</VBtn>-->
                <!--<VBtn variant="outlined" @click="drawer = false">Cancel</VBtn>-->
            <!--</VCardActions>-->
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
