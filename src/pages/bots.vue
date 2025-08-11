<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import Frame from '@/assets/images/Frame.svg?url'
import Group from '@/assets/images/Group.svg?url'
import { onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const botList = ref([])
const profits = ref([])
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

const fetchBots = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    console.log(token);
    const response = await axios.get('https://stocktrader.eazybot.com/api/v1/0/bots?is_backtest=0', {
      'Accept': 'application/json',
      headers: {
        'X-CSRF-TOKEN': token,
      }
    })

    if (response.data.result && response.data.data?.bots) {
      botList.value = response.data.data.bots
      profits.value = response.data.data.profits
      quoteWiseProfits.value = response.data.data.quoteWiseProfits
      balances.value = response.data.data.balances
      botSessions.value = response.data.data.sessions
      lastTrades.value = response.data.data.lastTrades
      initialbalances.value = response.data.data.initialbalances
      exchanges.value = response.data.data.exchanges
    console.log("Exchange list: " , exchanges)
    } else {
      errorMessage.value = 'No bots found.'
    }
  } catch (error) {
    errorMessage.value = 'Error fetching bots.'
  }
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

onMounted(() => {
  fetchBots()
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
<!--      <VRow>-->
<!--        <VCol cols="12" sm="6" lg="4">-->
<!--          <VCard>-->
<!--            <VCardItem class="card-active">-->
<!--              <VCardTitle><RouterLink class="v-card-title" to="/view-bot">ETH/USDT - 1481.71</RouterLink>  </VCardTitle>-->
<!--              <template #append>-->
<!--                <span class="font-weight-bold">Active</span>-->
<!--                <div>-->
<!--                  <MoreBtn :menu-list="moreList" />-->
<!--                </div>-->
<!--              </template>-->
<!--            </VCardItem>-->
<!--            <VDivider />-->

<!--            &lt;!&ndash;      <VCardText>&ndash;&gt;-->
<!--            <VList class="card-list">-->
<!--              <VCardText class="pb-0 pt-4">-->
<!--                <VListItem>-->
<!--                  <div class="d-flex align-center gap-2">-->
<!--                    <VAvatar>-->
<!--                      <img :src="Group">-->
<!--                    </VAvatar>-->
<!--                    <VAvatar style="margin-left: -25px">-->
<!--                      <img :src="Frame">-->
<!--                    </VAvatar>-->
<!--                    <div>-->
<!--                      <div class="font-weight-medium">ETH</div>-->
<!--                      <div class="text-caption grey&#45;&#45;text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>-->
<!--                    </div>-->
<!--                    <div class="ml-auto text-right">-->
<!--                      <div class="text-caption grey&#45;&#45;text">Strategy Type</div>-->
<!--                      <div class="font-weight-medium">SBS</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </VListItem>-->
<!--                &lt;!&ndash;                <VDivider />&ndash;&gt;-->
<!--              </VCardText>-->
<!--              <VListItem>-->
<!--                <VCardText class="pb-0 pt-0">-->
<!--                  <div class="d-flex align-center gap-2 py-2">-->
<!--                    <VRow dense class="w-100">-->
<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Exchange<br /><span class="text-sub-caption">Binance</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Strategy<br /><span class="text-sub-caption">Custom</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </div>-->

<!--                  <VDivider />-->
<!--                  <VRow dense class="py-2 align-center">-->
<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Profit</span>-->
<!--                        <span class="text-h4 font-weight-bold">166.30</span>-->
<!--                      </div>-->
<!--                    </VCol>-->

<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center align-end">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Market Vs Average</span>-->
<!--                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">-->
<!--                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>-->
<!--                      </div>-->
<!--                    </VCol>-->
<!--                  </VRow>-->
<!--                  &lt;!&ndash;              <VDivider />&ndash;&gt;-->
<!--                </VCardText>-->
<!--                &lt;!&ndash; Other Metrics &ndash;&gt;-->
<!--                <div class="card-bg-metrics">-->
<!--                  <VCardText class="pb-0 pt-0">-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Today Profit (9h:19m)</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Initial Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Current Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Available Quote Coins</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Runtime</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Last Trade</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </VCardText>-->
<!--                </div>-->
<!--                &lt;!&ndash; Footer &ndash;&gt;-->
<!--                <VCardText class="align-center">-->
<!--                  <div class="text-caption text-center mt-2 grey&#45;&#45;text">-->
<!--                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />-->
<!--                  </div>-->
<!--                </VCardText>-->
<!--              </VListItem>-->
<!--            </VList>-->
<!--            &lt;!&ndash;      </VCardText>&ndash;&gt;-->
<!--          </VCard>-->
<!--        </VCol>-->
<!--        <VCol-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--          lg="4"-->
<!--        >-->
<!--          <VCard>-->
<!--            <VCardItem class="card-sell-only">-->
<!--              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT - 1481.71</a>  </VCardTitle>-->
<!--              <template #append>-->
<!--                <span class="font-weight-bold">Sell Only</span>-->
<!--                <div>-->
<!--                  <MoreBtn :menu-list="moreList" />-->
<!--                </div>-->
<!--              </template>-->
<!--            </VCardItem>-->
<!--            <VDivider />-->
<!--            &lt;!&ndash;      <VCardText>&ndash;&gt;-->
<!--            <VList class="card-list">-->
<!--              <VCardText class="pb-0 pt-4">-->
<!--                <VListItem>-->
<!--                  <div class="d-flex align-center gap-2">-->
<!--                    <VAvatar>-->
<!--                      <img :src="Group">-->
<!--                    </VAvatar>-->
<!--                    <VAvatar style="margin-left: -25px">-->
<!--                      <img :src="Frame">-->
<!--                    </VAvatar>-->
<!--                    <div>-->
<!--                      <div class="font-weight-medium">ETH</div>-->
<!--                      <div class="text-caption grey&#45;&#45;text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>-->
<!--                    </div>-->
<!--                    <div class="ml-auto text-right">-->
<!--                      <div class="text-caption grey&#45;&#45;text">Strategy Type</div>-->
<!--                      <div class="font-weight-medium">SBS</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </VListItem>-->
<!--                &lt;!&ndash;                <VDivider />&ndash;&gt;-->
<!--              </VCardText>-->
<!--              <VListItem>-->
<!--                <VCardText class="pb-0 pt-0">-->
<!--                  <div class="d-flex align-center gap-2 py-2">-->
<!--                    <VRow dense class="w-100">-->
<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Exchange<br /><span class="text-sub-caption">Binance</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Strategy<br /><span class="text-sub-caption">Custom</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </div>-->
<!--                  <VDivider />-->
<!--                  <VRow dense class="py-2 align-center">-->
<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Profit</span>-->
<!--                        <span class="text-h4 font-weight-bold">166.30</span>-->
<!--                      </div>-->
<!--                    </VCol>-->

<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center align-end">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Market Vs Average</span>-->
<!--                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">-->
<!--                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>-->
<!--                      </div>-->
<!--                    </VCol>-->
<!--                  </VRow>-->
<!--                  &lt;!&ndash;              <VDivider />&ndash;&gt;-->
<!--                </VCardText>-->
<!--                &lt;!&ndash; Other Metrics &ndash;&gt;-->
<!--                <div class="card-bg-metrics">-->
<!--                  <VCardText class="pb-0 pt-0">-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Today Profit (9h:19m)</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Initial Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Current Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Available Quote Coins</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Runtime</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Last Trade</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </VCardText>-->
<!--                </div>-->
<!--                &lt;!&ndash; Footer &ndash;&gt;-->
<!--                <VCardText class="align-center">-->
<!--                  <div class="text-caption text-center mt-2 grey&#45;&#45;text">-->
<!--                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />-->
<!--                  </div>-->
<!--                </VCardText>-->
<!--              </VListItem>-->
<!--            </VList>-->
<!--            &lt;!&ndash;      </VCardText>&ndash;&gt;-->
<!--          </VCard>-->
<!--        </VCol>-->
<!--        <VCol-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--          lg="4"-->
<!--        >-->
<!--          <VCard>-->
<!--            <VCardItem class="card-inactive">-->
<!--              <VCardTitle><a class="v-card-title" href="/view-bot">ETH/USDT - 1481.71</a>  </VCardTitle>-->
<!--              <template #append>-->
<!--                <span class="font-weight-bold">Inactive</span>-->
<!--                <div>-->
<!--                  <MoreBtn :menu-list="moreList" />-->
<!--                </div>-->
<!--              </template>-->
<!--            </VCardItem>-->
<!--            <VDivider />-->

<!--            &lt;!&ndash;      <VCardText>&ndash;&gt;-->
<!--            <VList class="card-list">-->
<!--              <VCardText class="pb-0 pt-4">-->
<!--                <VListItem>-->
<!--                  <div class="d-flex align-center gap-2">-->
<!--                    <VAvatar>-->
<!--                      <img :src="Group">-->
<!--                    </VAvatar>-->
<!--                    <VAvatar style="margin-left: -25px">-->
<!--                      <img :src="Frame">-->
<!--                    </VAvatar>-->
<!--                    <div>-->
<!--                      <div class="font-weight-medium">ETH</div>-->
<!--                      <div class="text-caption grey&#45;&#45;text">ID: 107543 <VIcon icon="tabler-copy" size="20" /></div>-->
<!--                    </div>-->
<!--                    <div class="ml-auto text-right">-->
<!--                      <div class="text-caption grey&#45;&#45;text">Strategy Type</div>-->
<!--                      <div class="font-weight-medium">SBS</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </VListItem>-->
<!--                &lt;!&ndash;                <VDivider />&ndash;&gt;-->
<!--              </VCardText>-->
<!--              <VListItem>-->
<!--                <VCardText class="pb-0 pt-0">-->
<!--                  <div class="d-flex align-center gap-2 py-2">-->
<!--                    <VRow dense class="w-100">-->
<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Exchange<br /><span class="text-sub-caption">Binance</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Strategy<br /><span class="text-sub-caption">Custom</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="3">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption grey&#45;&#45;text">Category<br /><span class="text-sub-caption">N/A Bot</span></span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </div>-->

<!--                  <VDivider />-->
<!--                  <VRow dense class="py-2 align-center">-->
<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Profit</span>-->
<!--                        <span class="text-h4 font-weight-bold">166.30</span>-->
<!--                      </div>-->
<!--                    </VCol>-->

<!--                    <VCol cols="6">-->
<!--                      <div class="d-flex flex-column justify-center align-end">-->
<!--                        <span class="text-caption grey&#45;&#45;text">Market Vs Average</span>-->
<!--                        <span class="text-h4 font-weight-bold d-flex align-center" style="color: red">-->
<!--                    <VIcon icon="tabler-s-turn-down" size="22" />-50.15%</span>-->
<!--                      </div>-->
<!--                    </VCol>-->
<!--                  </VRow>-->
<!--                  &lt;!&ndash;              <VDivider />&ndash;&gt;-->
<!--                </VCardText>-->
<!--                &lt;!&ndash; Other Metrics &ndash;&gt;-->
<!--                <div class="card-bg-metrics">-->
<!--                  <VCardText class="pb-0 pt-0">-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Today Profit (9h:19m)</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> -</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Initial Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2000.00</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Current Capital</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 2166.30</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Available Quote Coins</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><img :src="Frame" height="15" style="vertical-align: middle;"/> 993.62</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Runtime</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />144D 23H 17M</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                    <VDivider />-->
<!--                    <VRow dense class="py-2 align-center">-->
<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center">-->
<!--                          <span class="text-caption">Last Trade</span>-->
<!--                        </div>-->
<!--                      </VCol>-->

<!--                      <VCol cols="6">-->
<!--                        <div class="d-flex flex-column justify-center align-end">-->
<!--                          <span class="text-right text-h6 font-weight-medium">BUY C9 15D ago</span>-->
<!--                        </div>-->
<!--                      </VCol>-->
<!--                    </VRow>-->
<!--                  </VCardText>-->
<!--                </div>-->
<!--                &lt;!&ndash; Footer &ndash;&gt;-->
<!--                <VCardText class="align-center">-->
<!--                  <div class="text-caption text-center mt-2 grey&#45;&#45;text">-->
<!--                    Bot ID: 107543 <VIcon icon="tabler-copy" size="20" />-->
<!--                  </div>-->
<!--                </VCardText>-->
<!--              </VListItem>-->
<!--            </VList>-->
<!--            &lt;!&ndash;      </VCardText>&ndash;&gt;-->
<!--          </VCard>-->
<!--        </VCol>-->
<!--      </VRow>-->
      <VRow>

        <VCol v-for="(item, index) in botList"
              :key="item.id" cols="12" sm="6" lg="4">
          <VCard>
            <VCardItem :class="item.status == 0 ? 'card-inactive' : (item.sell_only > 0 ? 'card-sell-only' : 'card-active')">
              <VCardTitle>
                <RouterLink class="v-card-title" :to="`/bot/${item.id}`">{{item.symbol.code}} - 1481.71</RouterLink>
              </VCardTitle>
              <template #append>
                <span class="font-weight-bold">{{ item.status == 0 ? 'Inactive' : (item.sell_only > 0 ? 'Sell Only' : 'Active')}}</span>
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
                      <div class="font-weight-medium">{{item.strategy}}</div>
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
                          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">{{ exchanges[item.user_exchange_id].split('|')[0]}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">{{
                              item.is_cycle
                                ? 'Cycle'
                                : 'Single'}}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">{{
                              item.preset
                                ? 'Default EZB'
                                : 'Custom'
                            }}</span></span>
                        </div>
                      </VCol>

                      <VCol cols="3">
                        <div class="d-flex flex-column justify-center">
                          <span class="text-caption grey--text">Category<br /><span class="text-sub-caption">{{item.category_id}}</span></span>
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
                          {{
                            profits[item.id] ===
                            undefined
                              ? 0
                              : formatProfit(
                                profits[
                                  item.id
                                  ].profit_total
                              )
                          }}
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
                          {{
                              profits[item.id] ===
                              undefined
                                ? 0
                                : formatProfit(
                                  profits[
                                    item.id
                                    ].profit_today
                                )
                            }}
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
                          {{
                              initialbalances[
                                item.id
                                ] === undefined
                                ? 0
                                : formatProfit(
                                  initialbalances[
                                    item.id
                                    ]
                                )
                            }}
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
                          {{
                              balances[item.id] ===
                              undefined
                                ? 0
                                : formatProfit(
                                  balances[
                                    item.id
                                    ]
                                )
                            }}
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
                          <span class="text-right text-h6 font-weight-medium" v-if="item.open_orders_sum_executed_amount"><img :src="Frame" height="15" style="vertical-align: middle;"/>
{{
                              balances[item.id] ===
                              undefined
                                ? 0
                                : formatProfit(
                                  balances[
                                    item.id
                                    ] -
                                 item.open_orders_sum_executed_amount
                                )
                            }}
                          </span>
                          <span class="text-right text-h6 font-weight-medium" v-else><img :src="Frame" height="15" style="vertical-align: middle;"/>
{{
                                balances[item.id] ===
                                undefined
                                  ? 0
                                  : formatProfit(
                                    balances[
                                      item.id
                                      ]
                                  )
                              }}
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
                          <span class="text-right text-h6 font-weight-medium"><VIcon icon="tabler-clock-hour-4" size="20" />{{
                              formatDuration(
                                item.created_at
                              )
                            }}</span>
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
                             {{
                              lastTrades[item.id]
                                ? lastTrades[item.id]
                                  .side
                                : ''
                            }}

                                                    {{
                              lastTrades[item.id]
                                ? lastTrades[item.id]
                                  .stage == 2
                                  ? 'MCR'
                                  : ''
                                : ''
                            }}

                                                    {{
                              lastTrades[item.id]
                                ? lastTrades[item.id]
                                  .cover_index ===
                                null
                                  ? ''
                                  : 'C' +
                                  lastTrades[
                                    item.id
                                    ].cover_index
                                : ''
                            }}
                                                    {{
                              formatDate(
                                lastTrades[item.id]
                                  ? lastTrades[
                                    item.id
                                    ].created_at
                                    ? lastTrades[
                                      item.id
                                      ]
                                      .created_at
                                    : 0
                                  : 0
                              )
                            }}
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
