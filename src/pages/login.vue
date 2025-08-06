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
import loginimage from '@images/auth/login-img.png'
import goggleIcon from '@images/auth/google-icon.png'
import axios from 'axios'

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
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

// const login = () => {
//   // TODO: replace with real login logic / API call
//   if (form.value.email && form.value.password) {
//     localStorage.setItem('accessToken', 'demo-token')
//     // ✅ Redirect to dashboard
//     router.push({ name: 'root' }) // or router.push('/dashboard')
//   } else {
//     // refForm.validate()
//   }
// }
const errorMessage = ref('') // 🆕 store error message

const login = async () => {
  errorMessage.value = '' // clear previous error
  try {
    // Set base URL
    axios.defaults.baseURL = 'https://stocktrader.eazybot.com'

// Ensure credentials are sent (needed for cookies including CSRF token)
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true;

// Step 1: First, get CSRF token
    await axios.get('/sanctum/csrf-cookie')

// Step 2: Then, make the login request
    const response = await axios.post('/api/login', {
      email: form.value.email,
      password: form.value.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // ✅ Important if you need cookies
    })
    if (response.data.result) {
      localStorage.setItem('accessToken', response.data.api_token)
      router.push({ name: 'root' }) // redirect after login
    }
  } catch (error) {
    console.log(error.response);
    if (error.response.status == 401) {
      errorMessage.value = error.response.data.message || 'Login failed. Please try again.'
    }
    else {
      if (error.response && error.response.data && error.response.data.error) {
        const apiError = error.response.data.error
        const emailError = apiError.email?.[0]
        errorMessage.value = emailError || 'Login failed. Please try again.'
      } else {
        errorMessage.value = 'Server error. Please try again later.'
      }
    }
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
            :src="loginimage"
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
          <h3 class="text-h3 mb-1">
            Sign in to <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h3>

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
          <VAlert
            v-if="errorMessage"
            type="error"
            class="mb-4"
            dense
            border="start"
            border-color="error"
          >
            {{ errorMessage }}
          </VAlert>
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

                <div class="d-flex align-center flex-wrap justify-space-between my-6">
                  <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </RouterLink>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
<!--              <VCol-->
<!--                cols="12"-->
<!--                class="text-body-1 text-center"-->
<!--              >-->
<!--                <span class="d-inline-block">-->
<!--                  New on our platform?-->
<!--                </span>-->
<!--                <a-->
<!--                  class="text-primary ms-1 d-inline-block text-body-1"-->
<!--                  href="javascript:void(0)"-->
<!--                >-->
<!--                  Create an account-->
<!--                </a>-->
<!--              </VCol>-->

<!--              <VCol-->
<!--                cols="12"-->
<!--                class="d-flex align-center"-->
<!--              >-->
<!--                <VDivider />-->
<!--                <span class="mx-4">or</span>-->
<!--                <VDivider />-->
<!--              </VCol>-->

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
