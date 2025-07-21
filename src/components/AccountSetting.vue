<!--<template>-->
<!--  <div>-->
<!--    <VTabs-->
<!--      v-model="activeTab"-->
<!--      class="v-tabs-pill"-->
<!--    >-->
<!--      <VTab-->
<!--        v-for="item in tabs"-->
<!--        :key="item.icon"-->
<!--        :value="item.tab"-->
<!--        :to="{ name: item.tab}"-->
<!--      >-->
<!--        <VIcon-->
<!--          size="20"-->
<!--          start-->
<!--          :icon="item.icon"-->
<!--        />-->
<!--        {{ item.title }}-->
<!--      </VTab>-->
<!--    </VTabs>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--// tabs-->
<!--const tabs = [-->
<!--  {-->
<!--    title: 'Account',-->
<!--    icon: 'tabler-users',-->
<!--    tab: 'account-settings-account',-->
<!--  },-->
<!--  {-->
<!--    title: 'Security',-->
<!--    icon: 'tabler-lock',-->
<!--    tab: 'account-settings-security',-->
<!--  },-->
<!--  {-->
<!--    title: 'Billing & Plans',-->
<!--    icon: 'tabler-file-text',-->
<!--    tab: 'account-settings-billing-plans',-->
<!--  },-->
<!--  {-->
<!--    title: 'Notifications',-->
<!--    icon: 'tabler-bell',-->
<!--    tab: 'account-settings-notification',-->
<!--  },-->
<!--]-->

<!--</script>-->

<!--<style scoped>-->
<!--/* Active tab (Vuetify adds this class automatically) */-->
<!--::v-deep(.v-tab&#45;&#45;selected) {-->
<!--  background-color: rgb(var(&#45;&#45;v-theme-primary));-->
<!--  color: rgb(var(&#45;&#45;v-theme-on-primary)) !important;-->
<!--}-->
<!--</style>-->

<template>
  <VTabs
    v-model="activeTab"
    class="v-tabs-pill"
    background-color="transparent"
    grow
  >
    <VTab
      v-for="item in tabs"
      :key="item.icon"
      :value="item.tab"
      :to="{ name: item.tab}"
    >
      <VIcon size="20" start :icon="item.icon" />
      {{ item.title }}
    </VTab>
  </VTabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('account-settings-account')

const tabs = [
  {
    title: 'My Profile',
    icon: 'tabler-users',
    tab: 'account-settings-account',
  },
  {
    title: 'My Subscription',
    icon: 'tabler-file-text',
    tab: 'account-settings-billing-plans',
  },
  {
    title: 'My Exchanges',
    icon: 'tabler-exchange',
    tab: 'my-exchanges',
  },
  {
    title: 'My Vouchers',
    icon: 'tabler-gift-card',
    tab: 'my-exchanges',
  },
  {
    title: 'Password and 2FA - Security',
    icon: 'tabler-lock',
    tab: 'account-settings-security',
  },
  {
    title: 'Notifications',
    icon: 'tabler-bell',
    tab: 'account-settings-notification',
  },
]
</script>

<style scoped>

/* Active tab (Vuetify adds this class automatically) */
::v-deep(.v-tab--selected) {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary)) !important;
}
::v-deep(.v-slide-group__container) {
  flex: unset !important;
}
</style>

