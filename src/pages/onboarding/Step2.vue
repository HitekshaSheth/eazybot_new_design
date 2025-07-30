<!-- src/views/onboarding/Step1.vue -->
<template>
    <VRow v-if="mdAndUp">
        <VCol cols="12" class="v-col-md-12 v-col-12">
            <h5 class="text-h5 font-weight-bold">Exchange Details</h5>
            &nbsp;
            <VAlert
                    border="start"
                    border-color="primary"
                    icon="tabler-accessible"
                    type="primary"
                    variant="tonal"
            >
                <VAlertTitle class="mb-1" >
                    Do you have any of the below exchange account?
                  <VRadioGroup v-model="inlineRadio" inline>
                    <v-spacer />

                    <VRadio style="padding: 0rem 1.5rem 0px 1rem !important;border-radius: 0.375rem;"
                            class="v-label custom-input"
                            label="Yes"
                            value="1"
                    />
                    <VRadio style="padding: 0rem 1.5rem 0px 1rem !important;border-radius: 0.375rem;"
                            class="v-label custom-input"
                            label="No"
                            value="0"
                    />
                </VRadioGroup>
                </VAlertTitle>
            </VAlert>
        </VCol>
        <VCol cols="12">
            <VForm class="v-col-md-12" @submit.prevent="() => {}">
                <VRow>
                    <VCol>
                        <h5 class="text-h5 font-weight-bold">Select one of the exchange below to continue
                        </h5>
                        <p class="mb-0">We recommend doing this step on a laptop or desktop for a better experience
                        </p>
                    </VCol>
                </VRow>
                <VRow>
                    <Vcol class="ma-5">
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

                    </Vcol>
                </VRow>
                <VRow v-if="inlineRadio === '0'">
                    <VCol>
                        <VCard>
                            <VRow>
                                <VCol
                                        cols="12"
                                        sm="8"
                                        md="12"
                                        lg="7"
                                        order="2"
                                        order-lg="1"
                                >
                                    <VCardItem>
                                        <VCardTitle>Create an API key on Binance
                                        </VCardTitle>
                                    </VCardItem>

                                    <VCardText class="text-lg-h6 font-medium">
                                        <VList :items="items" />
                                    </VCardText>


                                </VCol>

                                <VCol
                                        cols="12"
                                        sm="4"
                                        md="12"
                                        lg="5"
                                        order="1"
                                        order-lg="2"
                                        class="member-pricing-bg text-center"
                                >
                                    <div class="membership-pricing d-flex flex-column align-center justify-center">
                                        <VImg
                                        :src="cardimg"
                                        width="400"
                                        height="500"
                                        />
                                    </div>
                                </VCol>
                            </VRow>
                        </VCard>

                    </VCol>
                </VRow>

                <VRow  v-if="selectedRadio">
                    <VCol>
                        <h5 class="text-h5 font-weight-medium" >Connect {{ selectedRadio }}</h5>
                        <p class="mb-0">No funds yet on your exchange or encountering a connection error? Click on “continue”. You can add or edit your API keys later.
                        </p>
                    </VCol>
                </VRow>
                <VRow  v-if="selectedRadio">
                    <!-- 👉 First Name -->
                    <VCol
                            cols="12"
                            md="6"
                    >
                        <AppTextField class="pt-4"
                                v-model="connectionName"
                                label="Connection Name"
                                placeholder="Binance"
                        />
                        <AppTextField class="pt-4"
                                v-model="apiKey"
                                label="Api Key"
                                placeholder="***"
                        />
                        <AppTextField class="pt-4"
                                      v-model="apiSecret"
                                      label="Api Secret"
                                      placeholder="*****"
                        />
                    </VCol>

                    <VCol
                            cols="12"
                            md="6"
                    >
                        <AppTextarea class="pt-4"
                                label="Trusted IP (Recommended)"
                                auto-grow
                                rows="3"
                                row-height="15"
                                placeholder="198.51.100.0/24, 2001:db8::/64 198.51.100.0/24"
                        />


                    </VCol>
                </VRow>
            </VForm>
        </VCol>
    </VRow>
    <VRow v-else>
        <VCol cols="12">
            <h5 class="text-h5 font-weight-bold">Exchange Details</h5>
            &nbsp;
          <VAlert
            border="start" border-color="primary" icon="tabler-accessible" type="primary" variant="tonal">
<!--            <VAlertTitle class="mb-1" >-->
              <VRow class="pt-4 pl-4">Do you have any of the below exchange account?</VRow><br/>
            <VRadioGroup v-model="inlineRadio">
              <VRow class="justify-space-between" no-gutters>
                <VCol cols="6" class="pr-2">
                  <VRadio
                    label="Yes"
                    value="1"
                    class="v-label custom-input"
                    style="padding: 0rem 1.5rem 0px 1rem; border-radius: 0.375rem;"
                  />
                </VCol>

                <VCol cols="6" class="d-flex justify-end pl-2">
                  <VRadio
                    label="No"
                    value="0"
                    class="v-label custom-input"
                    style="padding: 0rem 1.5rem 0px 1rem; border-radius: 0.375rem;"
                  />
                </VCol>
              </VRow>
            </VRadioGroup>
<!--            </VAlertTitle>-->
          </VAlert>
        </VCol>
        <VCol cols="12">
            <VForm @submit.prevent="() => {}">
                <VRow>
                    <VCol>
                        <h5 class="text-h5 font-weight-bold">Select one of the exchange below to continue
                        </h5>
                        <p class="mb-0">We recommend doing this step on a laptop or desktop for a better experience
                        </p>
                    </VCol>
                </VRow>
                <VRow>
                    <Vcol>
                        <CustomRadios v-model:selected-radio="selectedRadio" :radio-content="radioContent" :grid-column="{ sm: '3', cols: '6' }">
                            <template #default="{ item, isSelected }">
                                <div class="d-flex align-center justify-space-between w-100  custom-radio-item">
                                    <div>
                                        <span class="font-weight-medium">{{ item.title }}</span>
                                    </div>
                                    <img :src="item.img" alt="" height="20" />
                                </div>
                            </template>
                        </CustomRadios>
                    </Vcol>
                </VRow>
                <VRow v-if="inlineRadio === '0'">
                    <VCol>
                        <VCard>
                            <VRow>
                                <VCol cols="12">
                                    <VCardItem>
                                        <VCardTitle>Create an API key on Binance
                                        </VCardTitle>
                                    </VCardItem>

                                    <VCardText class="text-lg-h6 font-medium pb-0">
                                        <VList :items="items" />
                                    </VCardText>


                                </VCol>

                                <VCol cols="12" class="member-pricing-bg text-center pt-0">
                                    <div class="membership-pricing d-flex flex-column align-center justify-center">
                                        <VImg :src="cardimg" width="400"/>
                                    </div>
                                </VCol>
                            </VRow>
                        </VCard>

                    </VCol>
                </VRow>

                <VRow  v-if="selectedRadio">
                    <VCol>
                        <h5 class="text-h5 font-weight-medium" >Connect {{ selectedRadio }}</h5>
                        <p class="mb-0">No funds yet on your exchange or encountering a connection error? Click on “continue”. You can add or edit your API keys later.
                        </p>
                    </VCol>
                </VRow>
                <VRow  v-if="selectedRadio">
                    <!-- 👉 First Name -->
                    <VCol
                            cols="12"
                            md="6"
                    >
                        <AppTextField class="pt-4"
                                v-model="connectionName"
                                label="Connection Name"
                                placeholder="Binance"
                        />
                        <AppTextField class="pt-4"
                                v-model="apiKey"
                                label="Api Key"
                                placeholder="***"
                        />
                        <AppTextField class="pt-4"
                                      v-model="apiSecret"
                                      label="Api Secret"
                                      placeholder="*****"
                        />
                        <AppTextarea class="pt-4"
                                label="Trusted IP (Recommended)"
                                auto-grow
                                rows="3"
                                row-height="15"
                                placeholder="198.51.100.0/24, 2001:db8::/64 198.51.100.0/24"
                        />


                    </VCol>
                </VRow>
            </VForm>
        </VCol>
    </VRow>
</template>

<script setup>
    import cardimg from '@images/auth/video.jpg'
    import Btc from '@/assets/images/btc.svg?url'
    import Frame from '@/assets/images/btc.svg?url'
    import Busd from '@/assets/images/busd.svg?url'
    import Usdc from '@/assets/images/usdc.svg?url'
    import Sbs from '@/assets/images/Sbs.svg?url'
    import Chart from '@/assets/images/chart-mixed.svg?url'
    import { useDisplay } from 'vuetify'

    const { mdAndUp } = useDisplay()
    const firstName = ref('')
    const lastName = ref('')
    const city = ref('')
    const country = ref('')
    const company = ref('')
    const email = ref('')
    const checkbox = ref(false)
    const items = [
        {
            title: '1. Visit Binance and log in or sign up.',
            value: 1,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '2. Verify your account and go to API Management.',
            value: 2,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '3. Click “Create API”> “System generate API Key.',
            value: 3,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '4. Name your API, complete puzzle, and verify via phone, email, and authenticator.',
            value: 4,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '5. Copy Trusted IP addresses from EazyBot to whitelist in Binance.',
            value: 5,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '6. Enable Spot & Margin trading.',
            value: 6,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '7. Copy API Keys from Binance to EazyBot.',
            value: 7,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '8. Copy API Keys from Binance to EazyBot.',
            value: 8,
            props: {
                rounded: 'xl',
            },
        },
        {
            title: '9. Click “Continue” in EazyBot!',
            value: 9,
            props: {
                rounded: 'xl',
            },
        },
    ]
    const radioContent = [
        {
            title: 'Binance',
            value: 'Binance',
            img: Frame
        },
        {
            title: 'KuCoin',
            value: 'KuCoin',
            img : Usdc
        },
        {
            title: 'Bitget',
            value: 'Bitget',
            img : Busd
        },
        {
            title: 'Kraken',
            value: 'Kraken',
            img : Btc
        },
        {
            title: 'Coinbase Advanced\n',
            value: 'Coinbase',
            img : Btc
        },
        {
            title: 'Bybit',
            value: 'Bybit',
            img : Btc
        },
        {
            title: 'Coinbase Prime\n',
            value: 'prime',
            img : Btc
        },
    ]

    const selectedRadio = ref('Binance')

    const inlineRadio = ref('1')

    const countries = [
        'Foo',
        'Bar',
        'Fizz',
        'Buzz',
    ]
    defineProps(['formData'])
    const phoneNumber = ref('')

    const insetSwitch1 = ref(true)
    const insetSwitch2 = ref(false)
    const requiredValidator = v => !!v || 'This field is required'

    const phoneValidator = v => {
        const phoneRegex = /^\+?\d{10,15}$/
        if (!v) return 'Phone number is required'
        if (!phoneRegex.test(v)) return 'Enter a valid phone number'
        return true
    }

</script>

<style scoped>

    label{
        color: #334155;
    }
    .custom-radio-item {
        width: 50%;
        padding: 0 !important;
        margin: 0 !important;
        /*line-height: 1;*/
    }
    :deep(label.v-label.custom-input.custom-radio.rounded.cursor-pointer) {
      padding: 1rem 1rem 0.7rem 1rem !important;
    }
    @media (max-width: 600px) {
      :deep(label.v-label.custom-input.custom-radio.rounded.cursor-pointer) {
        padding: 0.5rem !important;
      }
    }
    :deep(.v-alert__prepend){
        display: none !important;
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
    ::v-deep(thead){
        background-color: #f5f8fb!important;
    }
</style>
