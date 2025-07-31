<script setup>
    import Step1 from '@/pages/onboarding/Step1.vue'
    import Step2 from '@/pages/onboarding/Step2.vue'
    import Step3 from '@/pages/onboarding/Step3.vue'
    import Step4 from '@/pages/onboarding/Step4.vue'
    import Step5 from '@/pages/onboarding/Step5.vue'
    import welcomeVideo from '@images/auth/welcome-video.png'
    import { useDisplay } from 'vuetify'

    const { mdAndUp } = useDisplay()
    import { ref, computed} from 'vue'

    const currentStep = ref(0)
    // Stepper data
    const numberedSteps = [
        {number: 1, title: 'Welcome', subtitle: 'Get started' },
        {number: 2, title: 'Personal Information', subtitle: 'Add personal info' },
        {number: 3, title: 'Select Exchange', subtitle: 'Choose your exchange' },
        {number: 4, title: 'Add Funds', subtitle: 'Deposit funds to your account' },
        {number: 5, title: 'Upgrade Subscription', subtitle: 'Finalize subscription' },
        {number: 6, title: 'Start Trading', subtitle: 'Begin your first trade' },
    ];


    // Only show current and next step
    const visibleSteps = computed(() =>
      numberedSteps.slice(currentStep.value, currentStep.value + 2)
    )

    // Styling helpers
    const getBgColor = index => {
      const realIndex = currentStep.value + index
      if (realIndex === currentStep.value) return 'rgb(var(--v-theme-primary))'
      return '#e5e7eb'
    }

    const getTextColor = index => {
      const realIndex = currentStep.value + index
      return realIndex === currentStep.value ? 'white' : '#64748b'
    }

    const getTextClass = index => {
      const realIndex = currentStep.value + index
      return {
        'text-primary': realIndex === currentStep.value,
        'text-caption': realIndex !== currentStep.value,
      }
    }


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
    <div v-if="mdAndUp" style="padding-top: 20px;" class="pt-20 mt-lg-10">
        <VRow style="height: auto">
            <VCol cols="12" md="3" :class=" $vuetify.display.smAndDown ? 'border-b mainsidebar' : 'border-e mainsidebar' ">
                <VCardText>
                    <AppStepper
                            v-model:current-step="currentStep"
                            direction="vertical"
                            :items="numberedSteps"
                    />
                </VCardText>
            </VCol>

            <VCol cols="12" md="9">
                <VCardText>
                    <VForm ref="stepperForm" >
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
                            <VWindowItem>
                                <VRow>
                                    <VCol cols="12">
                                        <h5 class="text-h5 font-weight-bold">Upgrade your subscription plan</h5>
                                    </VCol>

                                    <Step4></Step4>
                                </VRow>
                            </VWindowItem>
                            <VWindowItem>
                                <VRow>
                                    <Step5></Step5>
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
                                    Finish
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
    <div class="layout-page-content" v-else style="padding-top: 90px;">
      <!-- Stepper container with horizontal scroll -->

      <VRow style="height: auto">
        <div class="d-flex align-center pa-4" style="width: 100%;" :class = "currentStep < numberedSteps.length - 1 ? ' justify-space-between' : ''">
          <template v-for="(step, index) in visibleSteps" :key="step.number">
            <!-- Step Number -->
            <div
              class="rounded-circle d-flex align-center justify-center"
              :class = "step.number < numberedSteps.length ? '' : 'mr-4'"
              :style="{
        backgroundColor: getBgColor(index),
        color: getTextColor(index),
        width: '26px',
        height: '26px',
        fontSize: '14px',
      }"
            >
              {{ step.number }}
            </div>

            <!-- Step Title -->
            <div
              class="font-weight-bold"
              :class="getTextClass(index)">
              {{ step.title }}
            </div>

            <!-- Arrow (only if not last step) -->
            <div v-if=" step.number < numberedSteps.length">
              <VIcon icon="tabler-arrow-right" size="18" />
            </div>
          </template>
        </div>

        <VCol cols="12">
          <VForm ref="stepperForm" >
            <VWindow v-model="currentStep" class="disable-tab-transition">
              <VWindowItem>
                <VRow class="mg-lg-8 col-md-10">
                  <VCol cols="12" md="6">
                    <h5 class="text-h5 font-weight-bold">Welcome
                    </h5>
                    <p class="mb-0">Here’s a quick overview of our onboarding
                    </p>
                  </VCol>
                  <VCol cols="12">
                    <div>
                      <VImg :src="welcomeVideo"/>
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
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h5 class="text-h5 font-weight-bold">Upgrade your subscription plan</h5>
                  </VCol>

                  <Step4></Step4>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <Step5></Step5>
                </VRow>
              </VWindowItem>
            </VWindow>

            <!-- Buttons -->
            <VCol cols="12">
              <div class="d-flex flex-wrap gap-2 justify-center mt-4" :class="currentStep === 0 ? 'justify-sm-space-between' : 'justify-space-between'">
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
                  v-if="currentStep === numberedSteps.length - 1"
                  @click="onSubmit"
                >
                  Finish
                </VBtn>

                <VBtn v-else @click="handleNext">
                  Continue
                  <VIcon icon="tabler-arrow-right" end class="flip-in-rtl" />
                </VBtn>
              </div>
            </VCol>
          </VForm>
            </VCol>
        </VRow>
    </div>
</template>
<style scoped>
    .mainsidebar{
        max-width: 20%;
    }
    .v-container{
        max-width: 100%;
    }
    .border-e {
        height: 950px;
    }
    .text-caption,.text-primary{
      font-size: 14px!important;
    }
    @media (max-width: 390px) {
      .text-caption,.text-primary{
        font-size: 12px!important;
      }
      .v-btn--size-default{
        font-size: 12px!important;
      }
    }

    </style>
