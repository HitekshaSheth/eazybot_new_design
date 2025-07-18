<script setup>
    import Step1 from '@/pages/onboarding/Step1.vue'
    import Step2 from '@/pages/onboarding/Step2.vue'

    import { ref } from 'vue'

    // Stepper data
    const numberedSteps = [
        { title: 'Personal Information', subtitle: 'Add personal info' },
        { title: 'Select Exchange', subtitle: 'Add personal info' },
        { title: 'Add Funds', subtitle: 'Add social links' },
        { title: 'Upgrade Subscription', subtitle: 'Add social links' },
        { title: 'Start Trading', subtitle: 'Add social links' },
    ]

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
    <VCard style="padding-top: 20px;">
        <VRow style="height: 100vh">
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
                    <VForm ref="stepperForm">
                        <VWindow v-model="currentStep" class="disable-tab-transition">
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
                                        <h6 class="text-h6 font-weight-medium">Social Links</h6>
                                        <p class="mb-0">Add Social Links</p>
                                    </VCol>

                                    <VCol cols="12" md="6">
                                        <AppTextField
                                                v-model="formData.twitter"
                                                placeholder="https://twitter.com/abc"
                                                label="Twitter"
                                        />
                                    </VCol>

                                    <VCol cols="12" md="6">
                                        <AppTextField
                                                v-model="formData.facebook"
                                                placeholder="https://facebook.com/abc"
                                                label="Facebook"
                                        />
                                    </VCol>

                                    <VCol cols="12" md="6">
                                        <AppTextField
                                                v-model="formData.googlePlus"
                                                placeholder="https://plus.google.com/abc"
                                                label="Google+"
                                        />
                                    </VCol>

                                    <VCol cols="12" md="6">
                                        <AppTextField
                                                v-model="formData.linkedIn"
                                                placeholder="https://linkedin.com/abc"
                                                label="LinkedIn"
                                        />
                                    </VCol>
                                </VRow>
                            </VWindowItem>
                        </VWindow>

                        <!-- Buttons -->
                        <div style="margin: 0px 3rem;">
                            <VBtn
                                    color="secondary"
                                    v-if="currentStep > 0"
                                    variant="tonal"
                                    @click="currentStep--"
                            >
                                <VIcon icon="tabler-arrow-left" start class="flip-in-rtl" />
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
                    </VForm>
                </VCardText>
            </VCol>
        </VRow>
    </VCard>
</template>
