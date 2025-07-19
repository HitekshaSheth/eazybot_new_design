<!-- src/views/onboarding/Step1.vue -->
<template>
    <VRow >
        <VCol cols="12" md="7">
            <h5 class="text-h5 font-weight-bold">Account Details</h5>
            &nbsp
            <AppTextField class="mb-4"
                          v-model="formData.username"
                          placeholder="CarterLeonardo"
                          label="Username"
                          :rules="[requiredValidator]"

            />
            <AppSelect class="mb-4"
                       :items="countries"
                       label="Country"
                       placeholder="Select Country"
                       :rules="[requiredValidator]"
            />
            <AppTextField
                    v-model="phoneNumber"
                    name="mobile"
                    label="Phone Number"
                    placeholder="+1 123 456 7890"
                    class="mb-6"
                    :rules="[requiredValidator, phoneValidator]"
                    type="tel"
            />
            &nbsp;
            <h5 class="text-h5">
                Please select your communication preferences
            </h5>
            <VSwitch
                    v-model="insetSwitch1"
                    label="No, I want to receive Bot alerts and Notices"
            />
            <VSwitch
                    v-model="insetSwitch2"
                    label="Yes, I want to receive independent Representative Updates"
            />
        </VCol>
        <VCol md="1"></VCol>
        <VCol  cols="12" md="4">
            <h5 class="text-h5 font-weight-bold">
                Need help? Please reach out to your sponsor
            </h5>
            <br>
            <VCard class="pa-2 mt-4 rounded-xl bg-light-primary"
            elevation="2">
                <VCardItem>
                    <VCardTitle>
                        Contact Us
                    </VCardTitle>
                </VCardItem>
                <VCardText>
                    <div class="d-flex align-center mb-2">
                        <VAvatar
                                color="primary"
                                variant="tonal"
                                rounded
                                size="30"
                                class="me-2"
                        >
                            <VIcon class="tabler-device-mobile" size="20" />
                        </VAvatar>
                        <p class="text-md-h6 mb-0">Zoom Call Schedule</p>
                    </div>

                    <div class="d-flex align-center">
                        <VAvatar
                                color="primary"
                                variant="tonal"
                                rounded
                                size="30"
                                class="me-2"
                        >
                            <VIcon class="tabler-mail" size="20" />
                        </VAvatar>
                        <p class="text-md-h6 mb-0">support@eazybot.com</p>
                    </div>
                </VCardText>
            </VCard>
            &nbsp;

            <VCard class="pa-2 mt-4 rounded-xl bg-img"   :style="{ backgroundImage: `url(${cardimg})` }"
                   elevation="2" heigh="100vh"
            >

                <VCardItem>
                    <VCardTitle class="text-white">
                        Sponsor Details
                    </VCardTitle>
                </VCardItem>
                <VCardText>
                    <div class="d-flex align-start">
                        <VAvatar color="secondary" size="large" class="me-4">
                            <span class="text-lg">SE</span>
                        </VAvatar>
                        <div>
                            <p class="clamp-text text-white mb-0">Sagar Shah (#200593)</p>
                            <p class="clamp-text text-white mb-0">sagar22.shah@gmail.com</p>
                            <p class="clamp-text text-white mb-0">9712000339</p>
                        </div>
                    </div>
                </VCardText>
            </VCard>
        </VCol>

    </VRow>

</template>

<script setup>
    import cardimg from '@images/auth/sponsor-card.png'
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