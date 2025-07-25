<script setup>
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
    import verification from '@images/auth/verification-1.png'
    import authV2MaskDark from '@images/pages/misc-mask-dark.png'
    import authV2MaskLight from '@images/pages/misc-mask-light.png'
    import { themeConfig } from '@themeConfig'
    import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

    definePage({
        meta: {
            layout: 'blank',
            unauthenticatedOnly: false,
        },
    })

    const router = useRouter()

    const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
    const otp = reactive(['', '', '', '', '', ''])
    const otpRefs = Array.from({ length: 6 }, () => ref(null))
    const timer = ref(60)
    let interval = null

    const focusNext = (index, event) => {
        if (event.inputType === 'deleteContentBackward') {
            if (index > 0) otpRefs[index - 1].value?.focus()
            return
        }
        if (otp[index] && index < 5) {
            otpRefs[index + 1].value?.focus()
        }
    }

    onMounted(() => {
        interval = setInterval(() => {
            if (timer.value > 0) timer.value--
        }, 1000)
    })

    onBeforeUnmount(() => {
        clearInterval(interval)
    })

    const handleSubmitOtp = () => {
        const code = otp.join('')
        if (code.length === 6) {
            console.log('Verifying code:', code)
            // router.push({ name: 'root' })
        }
    }
</script>

<template>
    <a href="javascript:void(0)">
        <div class="auth-logo d-flex align-center gap-x-3">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
        </div>
    </a>

    <VRow no-gutters class="auth-wrapper bg-surface">
        <VCol md="8" class="d-none d-md-flex">
            <div class="position-relative loginbg-background w-100 me-0">
                <div class="d-flex align-center justify-center w-100 h-100" style="padding-inline: 6.25rem;">
                    <VImg max-width="613" :src="verification" class="auth-illustration mt-16 mb-2" />
                </div>
                <img class="auth-footer-mask flip-in-rtl" :src="authThemeMask" alt="auth-footer-mask" height="280" width="100">
            </div>
        </VCol>

        <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
            <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-6 text-center">
                <VCardText>
                    <h3 class="text-h3 mb-4">Verify Your Account</h3>
                    <p>
                        Enter the 6-digit verification code you have received on your email
                        <span class="text-primary font-weight-bold">vikas*******1990@gmail.com</span>
                    </p>
                </VCardText>

                <VCardText>
                    <div class="d-flex justify-center gap-2 mb-6">
                        <VTextField
                                v-for="(digit, i) in otp"
                                :key="i"

                                v-model="otp[i]"
                                ref="otpRefs[i]"
                                maxlength="1"
                                type="text"
                                class="otp-input"
                                hide-details
                                @input="focusNext(i, $event)"
                                :rules="[requiredValidator]"
                        />
                    </div>



                    <VBtn block @click="handleSubmitOtp" class="margin-top-3" :to="{ name: 'onboarding-welcome' }">
                        Verify
                    </VBtn>
                    <div class="text-center text-body-1 mb-6 margin-top-3">
    <span v-if="timer > 0">
      Resend code in (<strong>{{ timer }}</strong>s)
    </span>
                        <span v-else>
      <a href="#" class="text-primary">Resend Code</a>
    </span>
                    </div>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss">
    @use "@core/scss/template/pages/page-auth";
    .otp-input {
        max-width: 45px;
        text-align: center;
        font-size: 20px;
    }
</style>

<style setup>
    .loginbg-background {
        background: #2D57F8;
        border-radius: 15px;
    }
    .margin-top-3{
        margin-top: 3rem;
    }
</style>
