<template>
  <div class="app-page-header d-flex justify-space-between align-center mb-6 flex-wrap gap-y-4">
    <!-- Title -->
    <h4 class="text-h4 m-0">
      {{ title }}
    </h4>

    <!-- Breadcrumbs -->
    <div v-if="mdAndUp" class="breadcrumbs d-flex align-center gap-2 text-sm text-medium-emphasis">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="d-flex align-center gap-1">
          <RouterLink
            v-if="crumb.to && !crumb.disabled"
            :to="crumb.to"
            class="d-flex align-center text-primary"
          >
            <!-- Icon for home -->
            <VIcon
              v-if="index === 0 && crumb.icon"
              :icon="crumb.icon"
              size="18"
              class="me-1"
            />
            <span v-if="!crumb.icon">{{ crumb.title }}</span>
          </RouterLink>

          <span v-else class="text-body-2 text-disabled">
            {{ crumb.title }}
          </span>
        </div>

        <span v-if="index < breadcrumbs.length - 1">/</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

defineProps({
  title: {
    type: String,
    required: true,
  },
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
})
</script>
