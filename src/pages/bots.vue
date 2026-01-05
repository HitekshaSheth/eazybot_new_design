<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import Frame from '@/assets/images/Frame.svg?url'
import Group from '@/assets/images/Group.svg?url'
import { onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const botList = ref([])
const currentPage = ref(1)
const lastPage = ref(null)
const loading = ref(false)
const profits = ref([])
const stats = ref([])
const revenueInsight = ref([])
const quoteWiseProfits = ref([])
const balances = ref([])
const botSessions = ref([])
const lastTrades = ref([])
const initialbalances = ref([])
const exchanges = ref([])
const errorMessage = ref('')

const currentTime = () => {
  const date = new Date()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${hours}h:${minutes}m`
}

const fetchBots = async (page = 1) => {
  if (loading.value) return

  loading.value = true

  try {
    const token = localStorage.getItem('accessToken')
    console.log(token);

    const response = await axios.get(`http://127.0.0.1:8000/api/v1/bots?is_backtest=0&page=${page}`, {
      'Accept': 'application/json',
      headers: {
        'Authorization': token,
      }
    })
    const res = response.data.data
    console.log(response.data);

    if (response.data.success && response.data.data?.data) {
      stats.value = response.data.data.stats_info
      revenueInsight.value = response.data.data.revenue_insights
        if (page === 1) {
        botList.value = res.data
      } else {
        botList.value.push(...res.data)
      }
    } else {
      errorMessage.value = 'No bots found.'
    }
    currentPage.value = res.meta.current_page
    lastPage.value = res.meta.last_page

  } catch (error) {
    errorMessage.value = 'Error fetching bots.'
    console.error(error)
  }

  loading.value = false
}

// const getCategoryName = categoryId => {
//   const categoryMap = JSON.parse(botCategory)
//   const category = categoryMap[categoryId] || ''
//   return category.split(' (')[0]
// }

const getExchangeName = userExchangeId => {
  const exchange = exchanges.userExchangeId || ''
  console.log("Exchange object -  ", exchanges.userExchangeId)
  console.log("Exchange Array -  ", exchanges[userExchangeId])
  return exchange.split('|')[0]
}
import moment from 'moment'

function formatProfit(profit) {
  const tradeProfit = profit || 0

  if (tradeProfit === 0) return '-'

  if (tradeProfit < 0 || (tradeProfit > 0 && tradeProfit < 1)) {
    return tradeProfit.toFixed(8)
  }

  return tradeProfit.toFixed(2)
}

function formatDuration(created_at, updated_at = null) {
  const currentDate = updated_at
    ? moment.utc(updated_at, 'YYYY-MM-DD HH:mm:ss')
    : moment().utc()

  const createdAtDate = moment.utc(created_at, 'YYYY-MM-DD HH:mm:ss')
  const diffMs = currentDate.diff(createdAtDate)
  const duration = moment.duration(diffMs)

  const diffDays = Math.floor(duration.asDays())
  const diffHours = duration.hours()
  const diffMinutes = duration.minutes()

  let formattedDuration = ''
  if (diffDays > 0) formattedDuration += `${diffDays}D `
  if (diffHours > 0) formattedDuration += `${diffHours}H `
  if (diffMinutes > 0) formattedDuration += `${diffMinutes}M`

  return formattedDuration.trim()
}

function formatDate(created_at) {
  if (!created_at || created_at == 0) {
    return '0D ago'
  }

  const createdDate = moment.utc(created_at, 'YYYY-MM-DD HH:mm:ss')
  const now = moment().utc()
  const diffDays = now.diff(createdDate, 'days')

  return diffDays === 0 ? 'Today' : `${diffDays}D ago`
}

const bottomTrigger = ref(null)

const loadMore = () => {
  if (currentPage.value < lastPage.value) {
    fetchBots(currentPage.value + 1)
  }
}

onMounted(() => {
  fetchBots()

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 }
  )

  if (bottomTrigger.value) observer.observe(bottomTrigger.value)
})


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

const moreList = [
  {
    title: 'Activate',
    value: 'Activate',
  },
  {
    title: 'Edit Settings',
    value: 'edit-settings',
  },
  {
    title: 'Remove Sell Only Mode',
    value: 'View All',
  },
  {
    title: 'Convert to Cycle',
    value: 'View All',
  },
  {
    title: 'Move to Group',
    value: 'View All',
  },
  {
    title: 'Download Trades',
    value: 'View All',
  },
  {
    title: 'Delete',
    value: 'delete',
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
            <span>Active: <span class="font-weight-bold" style="color: green">{{ stats.active }}</span></span>
            <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
            <span>Sell only: <span class="font-weight-bold" style="color:orange">{{ stats.sell_only }}</span></span>
            <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
            <span>Inactive: <span class="font-weight-bold" style="color:red">{{ stats.inactive }}</span></span>
          </div>
        </VCardText>
        <VTable class="text-no-wrap">
          <thead>
          <tr class="border-bg-thead">
            <th>
              Profile
            </th>
            <th>
              Today ({{ currentTime() }})
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
          <tr>
            <td class="font-weight-bold">
              Total Profit
            </td>
            <td>
              {{ formatProfit(revenueInsight.today) }}
            </td>
            <td>
              {{ formatProfit(revenueInsight.last_7_days) }}
            </td>
            <td>
              {{ formatProfit(revenueInsight.last_30_days) }}
            </td>
            <td>
              {{ formatProfit(revenueInsight.total) }}
            </td>
            <td>
              {{ formatProfit(revenueInsight.deleted_bots_total) }}
            </td>
            <td class="font-weight-bold">
              {{ formatProfit(revenueInsight.grand_total) }}
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
        <VCol v-for="(item, index) in botList"
              :key="item.id" cols="12" sm="6" lg="4">
          <VCard>
            <VCardItem :class="item.status == 'Inactive' ? 'card-inactive' : (item.sell_only == 'YES' ? 'card-sell-only' : 'card-active')">
              <VCardTitle>
                <RouterLink class="v-card-title" :to="`/bot/${item.id}`">{{item.coin_pair}} - 1481.71</RouterLink>
              </VCardTitle>
              <template #append>
                <span class="font-weight-bold">{{ item.sell_only == 'YES' ? 'Sell Only' : item.status}}</span>
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
                      <div class="font-weight-medium">{{ item.title }}</div>
                      <div class="text-caption grey--text">ID: {{item.id}} <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="text-caption grey--text">Strategy Type</div>
                      <div class="font-weight-medium">{{item.strategy_type}}</div>
                    </div>
                  </div>
                </VListItem>
                <!--                <VDivider />-->
              </VCardText>
              <VListItem>
                <VCardText class="pb-0 pt-0">
                  <div class="d-flex align-center gap-2 py-2">
                    <VRow dense class="w-100">
                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">{{ item.exchange}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">{{item.cycle_type }}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">{{item.strategy}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Category<br /><span class="text-sub-caption">{{item.category}}</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">
                          {{formatProfit(item.total_profit)}}
                        </span>
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
                          <span class="text-caption">Today Profit ({{ currentTime() }})</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/>
                          {{item.today_profit}}
                          </span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/>
                          {{item.initial_capital}}
                          </span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/>
                          {{item.current_capital}}
                          </span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/>
                            {{item.available_quote_coins}}
                          </span>
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
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />{{ item.runtime }}</span>
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
                          <span class="text-right text-h6 font-weight-medium">
                             {{item.last_trade}}
                          </span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: {{item.id}} <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
      </VRow>

      <!-- Load More Trigger -->
      <div ref="bottomTrigger" style="height: 1px"></div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-4">
        <VProgressCircular indeterminate />
      </div>
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
              <span>Active: <span class="font-weight-bold" style="color: green">{{ stats.active }}</span></span>
              <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
              <span>Sell only: <span class="font-weight-bold" style="color:orange">{{ stats.sell_only }}</span></span>
              <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
              <span>Inactive: <span class="font-weight-bold" style="color:red">{{ stats.inactive }}</span></span>
            </div>
            <VTable class="text-no-wrap pt-4">
              <thead>
              <tr class="border-bg-thead">
                <th>
                  Profile
                </th>
                <th>
                  Today ({{ currentTime() }})
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
              <tr>
                <td class="font-weight-bold">
                  Total Profit
                </td>
                <td>
                  {{ formatProfit(revenueInsight.today) }}
                </td>
                <td>
                  {{ formatProfit(revenueInsight.last_7_days) }}
                </td>
                <td>
                  {{ formatProfit(revenueInsight.last_30_days) }}
                </td>
                <td>
                  {{ formatProfit(revenueInsight.total) }}
                </td>
                <td>
                  {{ formatProfit(revenueInsight.deleted_bots_total) }}
                </td>
                <td class="font-weight-bold">
                  {{ formatProfit(revenueInsight.grand_total) }}
                </td>
              </tr>
              </tbody>
            </VTable>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <VRow class="mt-4">
        <VCol v-for="(item, index) in botList"
              :key="item.id" cols="12" sm="6" lg="4">
          <VCard>
            <VCardItem :class="item.status == 'Inactive' ? 'card-inactive' : (item.sell_only == 'YES' ? 'card-sell-only' : 'card-active')">
                <VCardTitle>
                  <RouterLink class="v-card-title" :to="`/bot/${item.id}`">{{item.coin_pair}} - 1481.71</RouterLink>
                </VCardTitle>
                <template #append>
                  <span class="font-weight-bold">{{ item.sell_only == 'YES' ? 'Sell Only' : item.status}}</span>
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
                      <div class="font-weight-medium">{{ item.title }}</div>
                      <div class="text-caption grey--text">ID: {{item.id}} <VIcon icon="tabler-copy" size="20" /></div>
                    </div>
                    <div  class="ml-auto text-right">
                      <div class="text-caption grey--text">Category</div>
                      <div class="font-weight-medium">{{ item.category }}</div>
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
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-circle-letter-b"/><span class="text-sub-caption-mobile">{{ item.exchange}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-refresh"/><span class="text-sub-caption-mobile">{{item.cycle_type }}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-world-cog"/><span class="text-sub-caption-mobile">{{item.preset}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text text-center"><VIcon icon="tabler-target-arrow"/><span class="text-sub-caption-mobile">{{item.strategy}}</span></span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>

                  <VDivider />
                  <VRow dense class="py-2 align-center">
                    <VCol cols="6">
                      <div class="d-flex flex-column justify-center">
                        <span class="text-caption grey--text">Profit</span>
                        <span class="text-h4 font-weight-bold">{{formatProfit(item.total_profit)}}</span>
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
                          <span class="text-caption">Today Profit ({{ currentTime() }})</span>
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="d-flex flex-column justify-center align-end">
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> {{item.today_profit}}</span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> {{item.initial_capital}}</span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> {{item.current_capital}}</span>
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
                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> {{item.available_quote_coins}}</span>
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
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />{{ item.runtime }}</span>
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
                          <span class="text-right text-h6 font-weight-medium">{{item.last_trade}}</span>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </div>
                <!-- Footer -->
                <VCardText class="align-center">
                  <div class="text-caption text-center mt-2 grey--text">
                    Bot ID: {{item.id}} <VIcon icon="tabler-copy" size="20" />
                  </div>
                </VCardText>
              </VListItem>
            </VList>
            <!--      </VCardText>-->
          </VCard>
        </VCol>
      </VRow>
      <!-- Load More Trigger -->
      <div ref="bottomTrigger" style="height: 1px"></div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-4">
        <VProgressCircular indeterminate />
      </div>
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
