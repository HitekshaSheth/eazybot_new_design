<script setup>
    import Step1 from '@/pages/onboarding/Step1.vue'
    import Step2 from '@/pages/onboarding/Step2.vue'
    import Step3 from '@/pages/onboarding/Step3.vue'
    import welcomeVideo from '@images/auth/welcome-video.png'
    import { ref } from 'vue'

    // Stepper data
    const numberedSteps = [
        { title: 'Welcome', subtitle: 'Get started' },
        { title: 'Personal Information', subtitle: 'Add personal info' },
        { title: 'Select Exchange', subtitle: 'Choose your exchange' },
        { title: 'Add Funds', subtitle: 'Deposit funds to your account' },
        { title: 'Upgrade Subscription', subtitle: 'Finalize subscription' },
        { title: 'Start Trading', subtitle: 'Begin your first trade' },
    ];


    const currentStep = ref(0)
    const isPasswordVisible = ref(false)
    const isCPasswordVisible = ref(false)
    const stepperForm = ref()

    // Simple required rule
    const required = v => !!v || 'This field is required'

    const formData = ref({
        username: '',
        email: '',
        password: '',
        cPassword: '',
        firstName: '',
        lastName: '',
        country: undefined,
        language: undefined,
        twitter: '',
        facebook: '',
        googlePlus: '',
        linkedIn: '',
    })

    const onSubmit = () => {
        console.log('Form Submitted:', formData.value)
    }

    // Handle validation before proceeding to next step
    const handleNext = async () => {
        const { valid } = await stepperForm.value.validate()
        if (valid) currentStep.value++
    }

    definePage({
        meta: {
            layout: 'onboarding',
            unauthenticatedOnly: false,
        },
    })
</script>

<template>
    <div style="padding-top: 20px;">
        <VRow style="height: auto">
            <VCol cols="12" md="2" :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e' ">
                <VCardText>
                    <AppStepper
                            v-model:current-step="currentStep"
                            direction="vertical"
                            :items="numberedSteps"
                    />
                </VCardText>
            </VCol>

            <VCol cols="12" md="10">
                <VCardText>
                    <VForm ref="stepperForm" class="ml-lg-15 mr-lg-15">
                        <VWindow v-model="currentStep" class="disable-tab-transition">
                            <VWindowItem>
                                <VRow class="mg-lg-8 col-md-10">
                                    <VCol cols="12" md="6">
                                        <h5 class="text-h5 font-weight-bold">Welcome
                                        </h5>
                                        <p class="mb-0">Here’s a quick overview of our onboarding
                                        </p>
                                    </VCol>
                                    <VCol
                                            cols="12"

                                    >
                                        <div>
                                            <VImg
                                                    :src="welcomeVideo"
                                                    style="max-width: 60%;"
                                            />
                                        </div>
                                    </VCol>
                                </VRow>
                            </VWindowItem>
                            <!-- STEP 1 -->
                            <VWindowItem>
                                <Step1 :formData="formData" />
                            </VWindowItem>

                            <!-- STEP 2 -->
                            <VWindowItem value="step2">
                                <Step2 :formData="formData" />
                            </VWindowItem>

                            <!-- STEP 3 -->
                            <VWindowItem>
                                <VRow>
                                    <VCol cols="12">
                                        <h5 class="text-h5 font-weight-bold">Pick a plan that works best for you</h5>
                                        <p class="mb-0">                            Stay cool, we have a 48-hour money back guarantee!
                                        </p>
                                    </VCol>

                                    <Step3></Step3>
                                </VRow>
                            </VWindowItem>
                        </VWindow>

                        <!-- Buttons -->
                        <VCol cols="12">
                            <div class="d-flex flex-wrap gap-2 justify-sm-space-between justify-center mt-4">
                                <VBtn
                                        color="secondary"
                                        variant="tonal"
                                        v-if="currentStep > 0"
                                        @click="currentStep--"
                                >
                                    <VIcon
                                            icon="tabler-arrow-left"
                                            start
                                            class="flip-in-rtl"
                                    />
                                    Previous
                                </VBtn>

                                <VBtn
                                        color="success"
                                        v-if="currentStep === numberedSteps.length - 1"
                                        @click="onSubmit"
                                >
                                    Submit
                                </VBtn>

                                <VBtn v-else @click="handleNext">
                                    Continue
                                    <VIcon icon="tabler-arrow-right" end class="flip-in-rtl" />
                                </VBtn>
                            </div>
                        </VCol>
                    </VForm>
                </VCardText>
            </VCol>
        </VRow>
    </div>
</template>
