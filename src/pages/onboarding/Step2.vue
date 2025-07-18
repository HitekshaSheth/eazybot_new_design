<!-- src/views/onboarding/Step1.vue -->
<template>
    <VRow class="mg-lg-8 col-md-10" style="margin:5px;">
        <VCol cols="12">&nbsp;
            <VAlert
                    border="start"
                    border-color="primary"
                    icon="tabler-accessible"
                    type="primary"
                    variant="tonal"
            >
                <VAlertTitle class="mb-1" >
                    Do you have any of the below exchange account?   <VRadioGroup
                        v-model="inlineRadio"
                        inline
                >   <v-spacer />

                    <VRadio style="padding: 0rem 1.5rem 0px 1rem !important;border-radius: 0.375rem;"
                            class="v-label custom-input"
                            label="Yes"
                            value="radio-1"
                    />
                    <VRadio style="padding: 0rem 1.5rem 0px 1rem !important;border-radius: 0.375rem;"
                            class="v-label custom-input"
                            label="No"
                            value="radio-2"
                    />
                </VRadioGroup>

                </VAlertTitle>
            </VAlert>
        </VCol>
        <VCol cols="12">
            <h5 class="text-h5 font-weight-medium">Select one of the exchange below to continue
            </h5>
            <p class="mb-0">We recommend doing this step on a laptop or desktop for a better experience
            </p>
        </VCol>
    </VRow>

</template>

<script setup>
    import cardimg from '@images/auth/sponsor-card.png'

    const inlineRadio = ref('radio-1')

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
<style>
    .bg-img{
        background-color:#45435c;
        background-size: cover;
        background-position: center;
    }
</style>