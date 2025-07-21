<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import Frame from '@/assets/images/Frame.svg?url'
import Group from '@/assets/images/Group.svg?url'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()


const pageTitle = 'Bots'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'Bots', to: '/bots' }
]
const bots = [
  {
    profile: 'USDC',
    today: '-',
    last7days: '-',
    last30days: '-',
    total: '-',
    deleted: '-',
    grand_total: '-',
  },  {
    profile: 'USDC',
    today: '-',
    last7days: '-',
    last30days: '1.74',
    total: '706.95',
    deleted: '1520.65',
    grand_total: '2227.60',
  },  {
    profile: 'Total Profit',
    today: '-',
    last7days: '-',
    last30days: '1.74',
    total: '706.95',
    deleted: '1520.65',
    grand_total: '2227.60',
  }

]
const activeProjects = [
  {
    title: 'Laravel',
    subtitle: 'Ecommerce',
    stats: '65',
    progressColor: 'error',
  },
  {
    title: 'Figma',
    subtitle: 'App UI Kit',
    stats: '86',
    progressColor: 'primary',
  },
  {
    title: 'VueJs',
    subtitle: 'Calendar App',
    stats: '90',
    progressColor: 'success',
  },
  {
    title: 'React',
    subtitle: 'Dashboard',
    stats: '37',
    progressColor: 'info',
  },
  {
    title: 'Bootstrap',
    subtitle: 'Website',
    stats: '22',
    progressColor: 'primary',
  },
  {
    title: 'Sketch',
    subtitle: 'Website Design',
    stats: '29',
    progressColor: 'warning',
  },
]

const moreList = [
  {
    title: 'Refresh',
    value: 'refresh',
  },
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'View All',
    value: 'View All',
  },
]

</script>

<template>

  <div v-if="mdAndUp">

    <AppPageHeader
      :title="pageTitle"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Page content here -->
    <div>
      <VCard>
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <!-- Left: Title -->
          <span class="font-weight-bold" style="color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important;">Bot Revenue Insights</span>

          <!-- Right: Statuses -->
          <div class="d-flex align-center gap-x-4">
            <span>Active: <span class="font-weight-bold" style="color: green">12</span></span>
            <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
            <span>Sell only: <span class="font-weight-bold" style="color:orange">6</span></span>
            <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
            <span>Inactive: <span class="font-weight-bold" style="color:red">4</span></span>
          </div>
        </VCardText>
        <VTable class="text-no-wrap">
          <thead>
          <tr class="border-bg-thead">
            <th>
              Profile
            </th>
            <th>
              Today (10h:35m)
            </th>
            <th>
              Last 7 days
            </th>
            <th>
              Last 30 days
            </th>
            <th>
              Total(non deleted bots)
            </th>
            <th>
              Deleted bots
            </th>
            <th>
              Grand Total
            </th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="(item, index) in bots"
            :key="item.bot"
          >
            <td :class="{ 'font-weight-bold': index === bots.length - 1 }">
              {{ item.profile }}
            </td>
            <td>
              {{ item.today }}
            </td>
            <td>
              {{ item.last7days }}
            </td>
            <td>
              {{ item.last30days }}
            </td>
            <td>
              {{ item.total }}
            </td>
            <td>
              {{ item.deleted }}
            </td>
            <td :class="{ 'font-weight-bold': index === bots.length - 1 }">
              {{ item.grand_total }}
            </td>
          </tr>
          </tbody>
        </VTable>

      </VCard>
      <div class="d-flex justify-space-between align-center flex-wrap gap-4 pt-4 pb-4">
        <!-- Left side: Title and Select -->
        <div class="d-flex align-center gap-x-4">
          <h2 class="text-h5">Bot Collection</h2>

          <AppSelect
            v-model="botStatus"
            placeholder="Bot Status"
            class="select-status"
            :items="[
        { value: 'Active', title: 'Active' },
        { value: 'Inactive', title: 'Inactive' },
        { value: 'Sell Only', title: 'Sell Only' }
      ]"
          />
        </div>

        <!-- Right side: Create button -->
        <div class="d-flex align-center gap-x-2">
          <!-- Optional: Add grid/filter icons here if needed -->
          <VIcon icon="tabler-table" />
          <VIcon icon="tabler-mist" />
          <VBtn
            prepend-icon="tabler-plus"
            :to="{ name: 'create-bot' }"
          >
            Create Bot
          </VBtn>
        </div>
      </div>
      <VRow>
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-active">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT - 1481.71</a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Active</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />

            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Strategy Type</div>
                      <div class="font-weight-medium">SBS</div>
                    </div>
                  </div>
                </VListItem>
                <VDivider />
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-sell-only">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT - 1481.71</a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Sell Only</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />
            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Strategy Type</div>
                      <div class="font-weight-medium">SBS</div>
                    </div>
                  </div>
                </VListItem>
                <VDivider />
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>
                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-inactive">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT - 1481.71</a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Inactive</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />

            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Strategy Type</div>
                      <div class="font-weight-medium">SBS</div>
                    </div>
                  </div>
                </VListItem>
                <VDivider />
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
      </VRow>
    </div>
  </div>
  <div v-else>

    <div class="app-page-header d-flex justify-space-between align-center mb-6 flex-wrap gap-y-4">
      <!-- Title -->
      <h4 class="text-h4 m-0">
        {{ pageTitle }}
      </h4>

      <!-- Breadcrumbs -->
      <div class="d-flex align-center gap-x-2">
        <!-- Optional: Add grid/filter icons here if needed -->
        <VIcon icon="tabler-table" />
        <VIcon icon="tabler-mist" />
        <VBtn
          prepend-icon="tabler-plus"
          :to="{ name: 'create-bot' }"
        >
          Create Bot
        </VBtn>
      </div>
    </div>

    <!-- Page content here -->
    <div>
      <VExpansionPanels class="no-icon-rotate" >
        <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
          <VExpansionPanelTitle disable-icon-rotate>
            Bot Revenue Insights
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <div class="d-flex align-center gap-x-4">
              <span>Active: <span class="font-weight-bold" style="color: green">12</span></span>
              <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
              <span>Sell only: <span class="font-weight-bold" style="color:orange">6</span></span>
              <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
              <span>Inactive: <span class="font-weight-bold" style="color:red">4</span></span>
            </div>
            <VTable class="text-no-wrap pt-4">
              <thead>
              <tr class="border-bg-thead">
                <th>
                  Profile
                </th>
                <th>
                  Today (10h:35m)
                </th>
                <th>
                  Last 7 days
                </th>
                <th>
                  Last 30 days
                </th>
                <th>
                  Total(non deleted bots)
                </th>
                <th>
                  Deleted bots
                </th>
                <th>
                  Grand Total
                </th>
              </tr>
              </thead>

              <tbody>
              <tr
                v-for="(item, index) in bots"
                :key="item.bot"
              >
                <td :class="{ 'font-weight-bold': index === bots.length - 1 }">
                  {{ item.profile }}
                </td>
                <td>
                  {{ item.today }}
                </td>
                <td>
                  {{ item.last7days }}
                </td>
                <td>
                  {{ item.last30days }}
                </td>
                <td>
                  {{ item.total }}
                </td>
                <td>
                  {{ item.deleted }}
                </td>
                <td :class="{ 'font-weight-bold': index === bots.length - 1 }">
                  {{ item.grand_total }}
                </td>
              </tr>
              </tbody>
            </VTable>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <VRow class="mt-4">
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-active">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT <strong>1481.71</strong></a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Active</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />

            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div  class="ml-auto text-right">
                      <div class="text-caption grey--text">Category</div>
                      <div class="font-weight-medium">Not Assigned Bot</div>
                    </div>
                  </div>
                </VListItem>
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-circle-letter-b"/><span class="text-sub-caption-mobile">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-refresh"/><span class="text-sub-caption-mobile">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-world-cog"/><span class="text-sub-caption-mobile">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-target-arrow"/><span class="text-sub-caption-mobile">SBS</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-sell-only">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT <strong>1481.71</strong></a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Sell Only</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />
            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Category</div>
                      <div class="font-weight-medium">Not Assigned Bot</div>
                    </div>
                  </div>
                </VListItem>
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-circle-letter-b"/><span class="text-sub-caption-mobile">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-refresh"/><span class="text-sub-caption-mobile">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-world-cog"/><span class="text-sub-caption-mobile">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-target-arrow"/><span class="text-sub-caption-mobile">SBS</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="4"
        >
          <VCard>
            <VCardItem class="card-inactive">
              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT <strong>1481.71</strong></a>  </VCardTitle>
              <template #append>
                <span class="font-weight-bold">Inactive</span>
                <div>
                  <MoreBtn :menu-list="moreList" />
                </div>
              </template>
            </VCardItem>
            <VDivider />

            <!--      <VCardText>-->
            <VList class="card-list">
              <VCardText class="pb-0 pt-4">
                <VListItem>
                  <div class="d-flex align-center gap-2">
                    <VAvatar>
                      <img :src="Group">
                    </VAvatar>
                    <VAvatar style="margin-left: -25px">
                      <img :src="Frame">
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">ETH</div>
                      <div class="text-caption grey--text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Category</div>
                      <div class="font-weight-medium">Not Assigned Bot</div>
                    </div>
                  </div>
                </VListItem>
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-circle-letter-b"/><span class="text-sub-caption-mobile">Binance</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-refresh"/><span class="text-sub-caption-mobile">Single</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-world-cog"/><span class="text-sub-caption-mobile">Custom</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-target-arrow"/><span class="text-sub-caption-mobile">SBS</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">166.30</span>
                      </div>
                    </VCol>

                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center align-end">
                        <span class="text-caption grey--text">Market Vs Average</span>
                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">
                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>
                      </div>
                    </VCol>
                  </VRow>
                  <!--              <VDivider />-->
                </VCardText>
                <!-- Other Metrics -->
                <div class="card-bg-metrics">
                  <VCardText class="pb-0 pt-0">
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Today Profit (9h:19m)</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Initial Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Current Capital</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Available Quote Coins</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Runtime</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>
                        </div>
                      </VCol>
                    </VRow>
                    <VDivider />
                    <VRow dense class="py-2 align-center">
                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption">Last Trade</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
      </VRow>
    </div>
  </div>
</template>
<style scoped>
.select-status {
  min-width: 180px;
}
th{
  font-weight: bold!important;
}
.card-list {
  --v-card-list-gap: 16px;
}
.card-active{
  background-color: #039855;
  color: #fff !important;
  padding: 2px 10px!important;
}
.card-active .v-card-title,.card-active .v-card-item__append .v-btn,.card-inactive .v-card-title,.card-inactive .v-card-item__append .v-btn,.card-sell-only .v-card-title,.card-sell-only .v-card-item__append .v-btn{
  color: #fff !important;
  font-size : 1rem!important;
}
.card-sell-only{
  background-color: #EAA700;
  color: #fff !important;
  padding: 2px 10px!important;
}
.card-inactive{
  background-color: #FE391F;
  color: #fff !important;
  padding: 2px 10px!important;
}
.text-sub-caption{
  font-weight: 500;
  color:#475569;
}
.text-sub-caption-mobile{
  font-weight: 500;
  color:#475569;
}
@media (max-width: 390px) {
  .text-sub-caption-mobile {
    font-size: 0.6225rem;
  }
}
.border-bg-thead{
  background-color: #f1f5f9;
  border-bottom: 1px solid #c1c4c7;
}
.card-bg-metrics{
  background-color: #fafafa;
  padding-left: 0px;
}
.card-bg-metrics .text-caption{
  color: #475569!important;
}
</style>
