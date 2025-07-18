<script setup>
    import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
    import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
    import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
    import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
    import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
    import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
    import authV2MaskDark from '@images/pages/misc-mask-dark.png'
    import authV2MaskLight from '@images/pages/misc-mask-light.png'
    import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
    import { themeConfig } from '@themeConfig'
    import landing from '@images/auth/landing.png'
    import goggleIcon from '@images/auth/google-icon.png'

    definePage({
        meta: {
            layout: 'blank',
            unauthenticatedOnly: false,
        },
    })

    const router = useRouter()

    const form = ref({
        email: 'admin@demo.com',
        password: 'admin',
        remember: false,
    })

    const isPasswordVisible = ref(false)
    const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
    const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

    const login = () => {
        // TODO: replace with real login logic / API call
        if (form.value.email && form.value.password) {
            localStorage.setItem('accessToken', 'demo-token')
            // ✅ Redirect to dashboard
            router.push({ name: 'root' }) // or router.push('/dashboard')
        } else {
            // refForm.validate()
        }
    }
</script>

<template>
    <a href="javascript:void(0)">
        <div class="auth-logo d-flex align-center gap-x-3">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
            <!--      <h1 class="auth-title">-->
            <!--        {{ themeConfig.app.title }}-->
            <!--      </h1>-->
        </div>
    </a>

    <VRow
            no-gutters
            class="auth-wrapper bg-surface"
    >
        <VCol
                md="8"
                class="d-none d-md-flex"
        >
            <div class="position-relative loginbg-background w-100 me-0">
                <div
                        class="d-flex align-center justify-center w-100 h-100"
                        style="padding-inline: 6.25rem;"
                >
                    <VImg
                            max-width="613"
                            :src="landing"
                            class="auth-illustration mt-16 mb-2"
                    />
                </div>

                <img
                        class="auth-footer-mask flip-in-rtl"
                        :src="authThemeMask"
                        alt="auth-footer-mask"
                        height="280"
                        width="100"
                >
            </div>
        </VCol>

        <VCol
                cols="12"
                md="4"
                class="auth-card-v2 d-flex align-center justify-center"
        >
            <VCard
                    flat
                    :max-width="500"
                    class="mt-12 mt-sm-0 pa-6"
            >
                <VCardText>
                    <h3 class="text-h3 mb-4">
                        Crypto Trading Made Eazy- Start Trading Now
                    </h3>
                    <p>
                        Sign up with
                        <span class="text-primary font-weight-bold">Sagar Shah</span>
                        referral
                    </p>
                </VCardText>
                <VCardText>
                    <VBtn block>
                        <img
                                :class="`${googleGLogo1Icon} mr-2`"
                                :src="goggleIcon"
                                alt="Google logo"
                        />
                        Sign Up with Google
                    </VBtn>


                    <div class="d-flex align-center my-4">
                        <v-divider class="flex-grow-1"></v-divider>
                        <span class="mx-4 text-subtitle-1">OR</span>
                        <v-divider class="flex-grow-1"></v-divider>
                    </div>
                    <VForm @submit.prevent="login">
                        <VRow>
                            <!-- email -->
                            <VCol cols="12">
                                <AppTextField
                                        v-model="form.email"
                                        autofocus
                                        label="Email Address"
                                        type="email"
                                        placeholder="johndoe@email.com"
                                        :rules="[requiredValidator, emailValidator]"
                                />
                            </VCol>

                            <!-- password -->
                            <VCol cols="12">
                                <AppTextField
                                        v-model="form.password"
                                        label="Password"
                                        placeholder="············"
                                        :type="isPasswordVisible ? 'text' : 'password'"
                                        autocomplete="password"
                                        :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                        :rules="[requiredValidator]"
                                />
                                <div class="text-right mb-2 pa-3">
                                    <RouterLink
                                            class="text-primary"
                                            :to="{ name: 'forgot-password' }"
                                    >
                                        Forgot Password?
                                    </RouterLink>
                                </div>

                                <div class="d-flex align-center flex-wrap justify-space-between my-6">
                                    <VCheckbox
                                            v-model="form.agree"
                                            color="primary"
                                            class="custom-control-primary align-start"
                                    >
                                        <template v-slot:label>
                                            <p class="text-sm ma-0">I agree to EazyBot’s
                                                <a class="text-primary-300">
                                                    Terms of Service
                                                </a>
                                                and acknowledge the
                                                <a href="#" target="_blank" class="text-primary-300 font-weight-medium">
                                                    Privacy Policy
                                                </a></p>
                                        </template>
                                    </VCheckbox>

                                </div>

                                <VBtn
                                        block
                                        type="submit"
                                >
                                    Create account
                                </VBtn>
                            </VCol>

                            <!-- create account -->
                                          <VCol
                                            cols="12"
                                            class="text-body-1 text-center"
                                          >
                                            <span class="d-inline-block">
                                              Already a member?
                                            </span>
                                            <a
                                              class="text-primary ms-1 d-inline-block text-body-1"
                                              href="javascript:void(0)"
                                            >
                                              Sign In
                                            </a>
                                          </VCol>

                                          <VCol
                                            cols="12"
                                            class="d-flex align-center"
                                          >
                                            <!--<VDivider />-->
                                            <!--<span class="mx-4">or</span>-->
                                            <!--<VDivider />-->
                                          </VCol>

                            <!-- auth providers -->
                            <!--              <VCol-->
                            <!--                cols="12"-->
                            <!--                class="text-center"-->
                            <!--              >-->
                            <!--                <AuthProvider />-->
                            <!--              </VCol>-->
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss">
    @use "@core/scss/template/pages/page-auth";
</style>
<style setup>
    .loginbg-background{
        background: #2D57F8;
        border-radius: 15px;
    }
</style>