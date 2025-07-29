<script setup>
import navItems from '@/navigation/vertical'
import { themeConfig } from '@themeConfig'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import CustomNotifications from '@/layouts/components/CustomNotification.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBarI18n from '@core/components/I18n.vue'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="30"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <span v-if="mdAndUp" class="d-inline-block px-4 py-2 rounded font-weight-medium"
              style="background-color: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary));">Hello Eazybot</span>
        <VSpacer />
        <VIcon v-if="mdAndUp" icon="tabler-cube" size="40" style="background-color: rgb(var(--v-global-theme-primary))"/>
        <VListItem v-if="mdAndUp" class="pl-0">
          <VListItemSubtitle>Loyalty points</VListItemSubtitle>
          <VListItemTitle class="font-weight-bold" style="line-height: 1rem;">5302.79</VListItemTitle>
        </VListItem>
        <!-- Wallet Balance -->
        <VIcon  v-if="mdAndUp" icon="tabler-wallet" size="40" style="background-color: rgb(var(--v-global-theme-primary))"/>
        <VListItem  v-if="mdAndUp" class="pl-0">
        <VListItemSubtitle>
          Wallet Balance
        </VListItemSubtitle>
          <VListItemTitle  class="font-weight-bold" style="line-height: 1rem;">15.22 <VIcon icon="tabler-s-turn-down" size="22"  style="background-color: red"/></VListItemTitle>
        </VListItem>
<!--        <VListItem class="pa-0 d-flex align-center">-->
<!--          <span class="font-weight-semibold">Wallet Balance</span>-->
<!--          <div class="d-flex align-center" style="gap: 6px;">-->
<!--            <span style="text-align: center">15.22</span>-->
<!--            <VIcon icon="tabler-s-turn-down" size="22" />-->

<!--          </div>-->
<!--        </VListItem>-->
        <NavbarThemeSwitcher  v-if="mdAndUp" />
<!--        <NavBarNotifications class="me-1" />-->
        <CustomNotifications class="me-1" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
