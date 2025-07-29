<template>
  <div>
    <!-- Notification Bell Icon -->
    <VBtn
      icon
      variant="text"
      @click.stop="menu = !menu"
      ref="bellRef"
    >
<!--      <VBadge-->
<!--        :content="totalUnread"-->
<!--        color="error"-->
<!--        overlap-->
<!--        offset-x="4"-->
<!--        offset-y="4"-->
<!--        bordered-->
<!--      >-->
<!--        <VIcon icon="tabler-bell" />-->
<!--      </VBadge>-->
      <VBadge
        v-bind="props.badgeProps"
       :content="totalUnread"
        color="error"
        dot
        offset-x="2"
        offset-y="3"
      >
        <VIcon icon="tabler-bell" />
      </VBadge>
    </VBtn>


    <!-- Notification Dropdown -->
    <VMenu
      v-model="menu"
      :close-on-content-click="false"
      activator="parent"
      location="bottom end"
      width="360"
      offset="10"
    >
      <VCard class="pa-0 rounded-lg" max-height="400">
        <!-- Tabs -->
        <VTabs
          v-model="tab"
          color="primary"
          slider-color="primary"
          class="px-4 pt-2"
        >
          <VTab>Bot Alerts</VTab>
          <VTab>
            <div class="d-flex align-center gap-x-1">
              Update
              <VChip size="small" color="grey-lighten-3" class="font-weight-medium" label>
                {{ updates.length }}
              </VChip>
            </div>
          </VTab>
          <VTab>Logs</VTab>
        </VTabs>

        <VDivider />

        <!-- Tab Content -->
        <VWindow v-model="tab" class="px-4 pt-3 pb-4" style="max-height: 320px; overflow-y: auto;">
          <!-- Alerts -->
          <VWindowItem>
            <div v-for="(item, i) in alerts" :key="`alert-${i}`" class="d-flex py-1 align-start">
              <VAvatar size="28" color="error" class="mt-1 mr-2">
                <VIcon icon="tabler-info-circle" size="16" />
              </VAvatar>
              <div class="notification-msg">{{ item.message }}</div>
            </div>
          </VWindowItem>

          <!-- Updates -->
          <VWindowItem>
            <div v-for="(item, i) in updates" :key="`update-${i}`" class="d-flex py-1 align-start">
              <VAvatar size="28" color="info" class="mt-1 mr-2">
                <VIcon icon="tabler-bell" size="16" />
              </VAvatar>
              <div class="notification-msg">{{ item.message }}</div>
            </div>
          </VWindowItem>

          <!-- Logs -->
          <VWindowItem>
            <div v-for="(item, i) in logs" :key="`log-${i}`" class="d-flex py-1 align-start">
              <VAvatar size="28" color="grey-darken-1" class="mt-1 mr-2">
                <VIcon icon="tabler-file-text" size="16" />
              </VAvatar>
              <div class="notification-msg">{{ item.message }}</div>
            </div>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VMenu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const menu = ref(false)
const tab = ref(0)

const props = defineProps({
  notifications: {
    type: Array,
    required: true,
  },
})

const alerts = computed(() => props.notifications.filter(n => n.type === 'alert').slice(0, 10))
const updates = computed(() => props.notifications.filter(n => n.type === 'update').slice(0, 20))
const logs = computed(() => props.notifications.filter(n => n.type === 'log').slice(0, 10))

const totalUnread = computed(() =>
  props.notifications.filter(n => !n.read).length
)
</script>
<style lang="scss">
.notification-section {
  padding-block: 0.75rem;
  padding-inline: 1rem;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }

  &:hover {
    .visible-in-hover {
      display: block;
    }
  }
}

.notification-list.v-list {
  .v-list-item {
    border-radius: 0 !important;
    margin: 0 !important;
    padding-block: 0.75rem !important;
  }
}

// Badge Style Override for Notification Badge
.notification-badge {
  .v-badge__badge {
    /* stylelint-disable-next-line liberty/use-logical-spec */
    min-width: 18px;
    padding: 0;
    block-size: 18px;
  }
}
.notification-msg{
  font-size: 14px;
}
</style>
