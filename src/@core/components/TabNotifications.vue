<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {computed, ref} from "vue";
const tab = ref(0)


const props = defineProps({
  notifications: {
    type: Array,
    required: true,
  },
  badgeProps: {
    type: Object,
    required: false,
    default: undefined,
  },
  location: {
    type: null,
    required: false,
    default: 'bottom end',
  },
})

const alerts = computed(() => props.notifications.filter(n => n.type === 'alert'))
const updates = computed(() => props.notifications.filter(n => n.type === 'update'))
const logs = computed(() => props.notifications.filter(n => n.type === 'log'))

const totalUnread = computed(() =>
  props.notifications.filter(n => !n.read).length
)


const emit = defineEmits([
  'read',
  'unread',
  'remove',
  'click:notification',
])

const isAllMarkRead = computed(() => {
  return props.notifications.some(item => item.isSeen === false)
})

const markAllReadOrUnread = () => {
  const allNotificationsIds = props.notifications.map(item => item.id)
  if (!isAllMarkRead.value)
    emit('unread', allNotificationsIds)
  else
    emit('read', allNotificationsIds)
}

const totalUnseenNotifications = computed(() => {
  return props.notifications.filter(item => item.isSeen === false).length
})

const toggleReadUnread = (isSeen, Id) => {
  if (isSeen)
    emit('unread', [Id])
  else
    emit('read', [Id])
}
</script>

<template>
  <IconBtn id="notification-btn">
    <VBadge
      v-bind="props.badgeProps"
      :model-value="props.notifications.some(n => !n.isSeen)"
      color="error"
      dot
      offset-x="2"
      offset-y="3"
    >
      <VIcon icon="tabler-bell" />
    </VBadge>

    <VMenu
      activator="parent"
      width="380px"
      :location="props.location"
      offset="12px"
      :close-on-content-click="false"
    >
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section pb-0">
          <VCardTitle class="text-h6">
            Notifications
          </VCardTitle>
          <template #append>
            <VChip
              v-show="props.notifications.some(n => !n.isSeen)"
              size="small"
              color="primary"
              class="me-2"
            >
              {{ totalUnseenNotifications }} New
            </VChip>
            <IconBtn
              v-show="props.notifications.length"
              size="34"
              @click="markAllReadOrUnread"
            >
              <VIcon
                size="20"
                color="high-emphasis"
                :icon="!isAllMarkRead ? 'tabler-mail' : 'tabler-mail-opened' "
              />

              <VTooltip
                activator="parent"
                location="start"
              >
                {{ !isAllMarkRead ? 'Mark all as unread' : 'Mark all as read' }}
              </VTooltip>
            </IconBtn>
          </template>
        </VCardItem>
        <VTabs
          v-model="tab"
          color="primary"
          slider-color="primary">
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

        <VWindow v-model="tab">
          <!-- Alerts -->
          <VWindowItem>
            <!--            <div v-for="(item, i) in alerts" :key="`alert-${i}`" class="d-flex py-1 align-start">-->
            <!-- 👉 Notifications list -->
            <PerfectScrollbar
              :options="{ wheelPropagation: false }"
              style="max-block-size: 23.75rem;"
            >
              <VList class="notification-list rounded-0 py-0">
                <template
                  v-for="(notification, index) in alerts"
                  :key="notification.title"
                >
                  <VDivider v-if="index > 0" />
                  <VListItem
                    link
                    lines="one"
                    min-height="66px"
                    class="list-item-hover-class"
                    @click="$emit('click:notification', notification)"
                  >
                    <!-- Slot: Prepend -->
                    <!-- Handles Avatar: Image, Icon, Text -->
                    <div class="d-flex align-start gap-3">
                      <VAvatar
                        :color="notification.color && !notification.img ? notification.color : undefined"
                        :variant="notification.img ? undefined : 'tonal' "
                      >
                        <span v-if="notification.text">{{ avatarText(notification.text) }}</span>
                        <VImg
                          v-if="notification.img"
                          :src="notification.img"
                        />
                        <VIcon
                          v-if="notification.icon"
                          :icon="notification.icon"
                        />
                      </VAvatar>

                      <div>
                        <p class="text-sm font-weight-medium mb-1">
                          {{ notification.title }}
                        </p>
                        <p
                          class="text-body-2 mb-2"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.subtitle }}
                        </p>
                        <p
                          class="text-sm text-disabled mb-0"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.time }}
                        </p>
                      </div>
                      <VSpacer />

                      <div class="d-flex flex-column align-end">
                        <VIcon
                          size="10"
                          icon="tabler-circle-filled"
                          :color="!notification.isSeen ? 'primary' : '#a8aaae'"
                          :class="`${notification.isSeen ? 'visible-in-hover' : ''}`"
                          class="mb-2"
                          @click.stop="toggleReadUnread(notification.isSeen, notification.id)"
                        />

                        <VIcon
                          size="20"
                          icon="tabler-x"
                          class="visible-in-hover"
                          @click="$emit('remove', notification.id)"
                        />
                      </div>
                    </div>
                  </VListItem>
                </template>

                <VListItem
                  v-show="!props.notifications.length"
                  class="text-center text-medium-emphasis"
                  style="block-size: 56px;"
                >
                  <VListItemTitle>No Notification Found!</VListItemTitle>
                </VListItem>
              </VList>
            </PerfectScrollbar>
            <!--            </div>-->
          </VWindowItem>

          <!-- Updates -->
          <VWindowItem>
            <PerfectScrollbar
              :options="{ wheelPropagation: false }"
              style="max-block-size: 23.75rem;"
            >
              <VList class="notification-list rounded-0 py-0">
                <template
                  v-for="(notification, index) in updates"
                  :key="notification.title"
                >
                  <VDivider v-if="index > 0" />
                  <VListItem
                    link
                    lines="one"
                    min-height="66px"
                    class="list-item-hover-class"
                    @click="$emit('click:notification', notification)"
                  >
                    <!-- Slot: Prepend -->
                    <!-- Handles Avatar: Image, Icon, Text -->
                    <div class="d-flex align-start gap-3">
                      <VAvatar
                        :color="notification.color && !notification.img ? notification.color : undefined"
                        :variant="notification.img ? undefined : 'tonal' "
                      >
                        <span v-if="notification.text">{{ avatarText(notification.text) }}</span>
                        <VImg
                          v-if="notification.img"
                          :src="notification.img"
                        />
                        <VIcon
                          v-if="notification.icon"
                          :icon="notification.icon"
                        />
                      </VAvatar>

                      <div>
                        <p class="text-sm font-weight-medium mb-1">
                          {{ notification.title }}
                        </p>
                        <p
                          class="text-body-2 mb-2"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.subtitle }}
                        </p>
                        <p
                          class="text-sm text-disabled mb-0"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.time }}
                        </p>
                      </div>
                      <VSpacer />

                      <div class="d-flex flex-column align-end">
                        <VIcon
                          size="10"
                          icon="tabler-circle-filled"
                          :color="!notification.isSeen ? 'primary' : '#a8aaae'"
                          :class="`${notification.isSeen ? 'visible-in-hover' : ''}`"
                          class="mb-2"
                          @click.stop="toggleReadUnread(notification.isSeen, notification.id)"
                        />

                        <VIcon
                          size="20"
                          icon="tabler-x"
                          class="visible-in-hover"
                          @click="$emit('remove', notification.id)"
                        />
                      </div>
                    </div>
                  </VListItem>
                </template>

                <VListItem
                  v-show="!props.notifications.length"
                  class="text-center text-medium-emphasis"
                  style="block-size: 56px;"
                >
                  <VListItemTitle>No Notification Found!</VListItemTitle>
                </VListItem>
              </VList>
            </PerfectScrollbar>

          </VWindowItem>

          <!-- Logs -->
          <VWindowItem>
            <PerfectScrollbar
              :options="{ wheelPropagation: false }"
              style="max-block-size: 23.75rem;"
            >
              <VList class="notification-list rounded-0 py-0">
                <template
                  v-for="(notification, index) in logs"
                  :key="notification.title"
                >
                  <VDivider v-if="index > 0" />
                  <VListItem
                    link
                    lines="one"
                    min-height="66px"
                    class="list-item-hover-class"
                    @click="$emit('click:notification', notification)"
                  >
                    <!-- Slot: Prepend -->
                    <!-- Handles Avatar: Image, Icon, Text -->
                    <div class="d-flex align-start gap-3">
                      <VAvatar
                        :color="notification.color && !notification.img ? notification.color : undefined"
                        :variant="notification.img ? undefined : 'tonal' "
                      >
                        <span v-if="notification.text">{{ avatarText(notification.text) }}</span>
                        <VImg
                          v-if="notification.img"
                          :src="notification.img"
                        />
                        <VIcon
                          v-if="notification.icon"
                          :icon="notification.icon"
                        />
                      </VAvatar>

                      <div>
                        <p class="text-sm font-weight-medium mb-1">
                          {{ notification.title }}
                        </p>
                        <p
                          class="text-body-2 mb-2"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.subtitle }}
                        </p>
                        <p
                          class="text-sm text-disabled mb-0"
                          style=" letter-spacing: 0.4px !important; line-height: 18px;"
                        >
                          {{ notification.time }}
                        </p>
                      </div>
                      <VSpacer />

                      <div class="d-flex flex-column align-end">
                        <VIcon
                          size="10"
                          icon="tabler-circle-filled"
                          :color="!notification.isSeen ? 'primary' : '#a8aaae'"
                          :class="`${notification.isSeen ? 'visible-in-hover' : ''}`"
                          class="mb-2"
                          @click.stop="toggleReadUnread(notification.isSeen, notification.id)"
                        />

                        <VIcon
                          size="20"
                          icon="tabler-x"
                          class="visible-in-hover"
                          @click="$emit('remove', notification.id)"
                        />
                      </div>
                    </div>
                  </VListItem>
                </template>

                <VListItem
                  v-show="!props.notifications.length"
                  class="text-center text-medium-emphasis"
                  style="block-size: 56px;"
                >
                  <VListItemTitle>No Notification Found!</VListItemTitle>
                </VListItem>
              </VList>
            </PerfectScrollbar>

          </VWindowItem>
        </VWindow>

        <VDivider />

        <!-- 👉 Footer -->
        <VCardText
          v-show="props.notifications.length"
          class="pa-4"
        >
          <VBtn
            block
            size="small"
          >
            View All Notifications
          </VBtn>
        </VCardText>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

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
.v-slide-group{
  overflow: unset!important;
}
</style>
