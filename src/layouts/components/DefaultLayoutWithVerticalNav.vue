<script setup>
import navItems from '@/navigation/vertical'
import { themeConfig } from '@themeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
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
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <VSpacer />
        <VIcon icon="tabler-circles" class="mr-2" />
        <VListItem class="pa-0 d-flex align-center">
          <span class="font-weight-semibold">Loyalty points</span>
          <div class="d-flex align-center" style="gap: 6px;">
            <span style="text-align: center">5302.79</span>
          </div>
        </VListItem>
        <!-- Wallet Balance -->
        <VIcon icon="tabler-wallet" class="mr-2" />
        <VListItem class="pa-0 d-flex align-center">
          <span class="font-weight-semibold">Wallet Balance</span>
          <div class="d-flex align-center" style="gap: 6px;">
            <span style="text-align: center">15.22</span>
            <VIcon icon="tabler-s-turn-down" size="22" />

          </div>
        </VListItem>
        <NavbarThemeSwitcher />
        <NavBarNotifications class="me-1" />
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
