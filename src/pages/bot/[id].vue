<script setup>
const route = useRoute('view-bot')
import AppPageHeader from '../../components/AppPageHeader.vue'
import Frame from '@/assets/images/Frame.svg?url'
import Group from '@/assets/images/Group.svg?url'
import { useDisplay } from 'vuetify'
import { onMounted } from 'vue'
import axios from 'axios'

const { mdAndUp } = useDisplay()
const viewMode = ref('card')

const pageTitle = 'Bot Insight'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'Bots', to: '/bots' },
  { title: route.params.id, to: '/view-bot' },
  { title: 'Bot Insight' }
]

const currentTab = ref('item-1')
const previousTab = ref('item-2')

const showDetails = ref(false)
const currentTradeList = ref([])
const currentSessionList = ref([])
const previousSessionList = ref([])
const errorMessage = ref('')

const stats = [
  { label: 'Trades closed', value: '7' },
  { label: 'Top positions sold', value: '0' },
  { label: 'Sliding covers', value: '22' },
  { label: 'Opening price', value: '4016.66' },
  { label: 'Closing price', value: '4079.54' },
  { label: 'Profit used', value: '-', icon: true },
  { label: 'Available profit', value: '2.42', icon: true },
  { label: 'Session profit', value: '$19.71', icon: true, color: 'text-success' },
]

const tradeItems = [
  {
    type: 'Buy',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
  },
  {
    type: 'Sell',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
    gross: '12.90',
    fees: '12.90',
    profit: '12.90',
    toTank: '12.90',
    net: '1.01',
    percent: '0.98%',
  },
  {
    type: 'Sell',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
    gross: '12.90',
    fees: '12.90',
    profit: '12.90',
    toTank: '12.90',
    net: '1.01',
    percent: '0.98%',
  },
  {
    type: 'Buy',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
  },
  {
    type: 'Sell',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
    gross: '12.90',
    fees: '12.90',
    profit: '12.90',
    toTank: '12.90',
    net: '1.01',
    percent: '0.98%',
  },
  {
    type: 'Buy',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
  },
  {
    type: 'Sell',
    title: 'Cover 5 @ -0.25%X0.143',
    tradeId: '504426',
    qty: '0.0291',
    rate: '3,634.04',
    total: '105.75',
    open: 'Dec 10, 2024 - 22:17',
    close: 'Dec 10, 2024 - 22:17',
    gross: '12.90',
    fees: '12.90',
    profit: '12.90',
    toTank: '12.90',
    net: '1.01',
    percent: '0.98%',
  },
  // Add more items as needed...
]

const isNull = val => val === null || val === undefined || val === '' || val === 'null'
const token = localStorage.getItem('accessToken')

const currentSessions = async () => {
  try {
    const token = localStorage.getItem('accessToken')

    const response = await axios.post('/api/v1/sessions', {
      bot_id: route.params.id,
      status: 'OPEN',
      total_records: 0
    }, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      withCredentials: true,
    })

    if (response.data.success && response.data?.sessions) {
      const sessions = response.data.sessions

      // Loop and await fetchTrades
      for (const session of sessions) {
        session.trades = await fetchTrades(session.id, token)
        console.log(`Trades for session ${session.id}`, session.trades)
      }

      currentSessionList.value = sessions
      console.log("Final session list with trades:", currentSessionList.value)
    }
  } catch (error) {
    errorMessage.value = 'Error fetching Sessions.'
    console.error(error)
  }
}

const fetchTrades = async (session_id, token) => {
  try {
    console.log("Fetching trades for session:", session_id)

    const response = await axios.post('/api/v1/trades', {
      bot_id: route.params.id,
      session_id: session_id,
      records: 20,
      total_records: 0
    }, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      withCredentials: true,
    })

    if (response.data.success && response.data?.trades) {
      return response.data.trades
    }
    return []
  } catch (error) {
    console.error(`Error fetching trades for session ${session_id}:`, error)
    return []
  }
}

const previousSessions = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await axios.post('/api/v1/sessions', {
      "bot_id": route.params.id,
      "status": "CLOSE",
      "total_records": 0
    },{
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      withCredentials: true,
    })

    if (response.data.success && response.data?.sessions) {
      const sessions = response.data.sessions

      for (const session of sessions) {
        session.trades = await fetchTrades(session.id, token)
        console.log(`Trades for session ${session.id}`, session.trades)
      }

      previousSessionList.value = sessions
    }
  } catch (error) {
    errorMessage.value = 'Error fetching Sessions.'
  }
}

const currentTrades = async () => {
  try {
    const response = await axios.post('/api/v1/trades', {
      "bot_id": route.params.id,
      "session_id": 18261,
      "records": 20,
      "total_records": 0
    },{
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      withCredentials: true,
    })

    if (response.data.success && response.data?.trades) {
      currentTradeList.value = response.data.trades
    } else {
      errorMessage.value = 'No Trades found.'
    }
  } catch (error) {
    errorMessage.value = 'Error fetching trades.'
  }
}

const formatDateTime = dateStr => {
  const date = new Date(dateStr)

  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use true for AM/PM
  }).format(date)

  return `${datePart} - ${timePart}`
}

onMounted(() => {
  currentSessions()
  previousSessions()
})
</script>
<template>
  <!-- Page content here -->
  <div v-if="mdAndUp">
    <AppPageHeader
      :title="pageTitle"
      :breadcrumbs="breadcrumbs"
    />
    <VCard>
      <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
        <!-- Left: Title -->
        <span class="font-weight-bold">
        <span class="pr-2">ETH</span>
      <VChip color="success">Active</VChip>
      </span>

        <!-- Right: Statuses -->
        <div class="d-flex align-center gap-x-4">
          <VBtn variant="outlined" prepend-icon="tabler-download">
            Export
          </VBtn>
          <VBtn
            prepend-icon="tabler-edit"
            :to="{ name: 'create-bot' }"
          >
            Edit Bot
          </VBtn>
        </div>
      </VCardText>
      <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
        <!-- Left: Title -->
        <VList class="card-list">
          <VListItem>
            <div class="d-flex align-center gap-2">
              <VAvatar>
                <img :src="Group">
              </VAvatar>
              <VAvatar style="margin-left: -25px">
                <img :src="Frame">
              </VAvatar>
              <div>
                <div class="font-weight-medium">ETH/USDT</div>
                <div class="text-caption grey--text">1481.71</div>
              </div>
            </div>
          </VListItem>
        </VList>

        <!-- Right: Statuses -->
        <div class="d-flex align-center gap-x-4">
          <span class="text-caption grey--text">Sessions Closed<br /><span class="text-sub-caption">10</span></span>
          <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
          <span class="text-caption grey--text">Exchange<br /><span class="text-sub-caption">Binance</span></span>
          <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
          <span class="text-caption grey--text">Cycle Type<br /><span class="text-sub-caption">Single</span></span>
          <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
          <span class="text-caption grey--text">Strategy<br /><span class="text-sub-caption">Custom</span></span>
          <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
          <span class="text-caption grey--text">Strategy Type<br /><span class="text-sub-caption">SBS</span></span>
          <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
          <span class="text-caption grey--text">Runtime<br /><span class="text-sub-caption">149D 20H 44M</span></span>
        </div>
      </VCardText>
      <VCardText class="justify-space-between align-center flex-wrap gap-4">
        <div class="pb-0 px-3 pt-3 mb-4 bg-light-primary rounded">

          <!-- Left: Title -->
          <VRow class="d-flex py-2 align-center">
            <VCol cols="2">
              <div class="font-weight-bold">Earnings Report <VIcon icon="tabler-arrow-right" size="20" /></div>
            </VCol>
            <VCol cols="2">
              <span class="text-caption grey--text">Today (7h:27m)<br /><span class="text-sub-caption">-</span></span>
            </VCol>
            <VCol cols="2">
              <span class="text-caption grey--text">Last 7 Days<br /><span class="text-sub-caption">-</span></span>
            </VCol>
            <VCol cols="2">
              <span class="text-caption grey--text">Last 30 Days<br /><span class="text-sub-caption">-</span></span>
            </VCol>
            <VCol cols="2">
              <span class="text-caption grey--text">Trades Closed<br /><span class="text-sub-caption">68</span></span>
            </VCol>
            <VCol cols="2">
              <span class="text-caption grey--text">Trade Profit <VIcon icon="tabler-info-circle"/><br /><span class="text-sub-caption" style="color: green">$ 166.30</span></span>
            </VCol>
          </VRow>
        </div>
      </VCardText>
    </VCard>
    <div class="mt-4 mb-4">
      <div class="d-flex justify-space-between align-center flex-wrap gap-4 pt-4 pb-4">
        <!-- Left side: Title and Select -->
        <div class="d-flex align-center gap-x-4">
          <VTabs v-model="currentTab">
            <VTab class="pl-2">Current Session</VTab>
            <VTab class="pl-2">
              <div class="d-flex align-center gap-1">
                <span>Previous Sessions</span>
                <VBadge
                  color="secondary"
                  content="3"
                  inline
                  bordered
                  offset-x="2"
                  offset-y="0"
                />
              </div>
            </VTab>
          </VTabs>
        </div>
        <div class="d-flex align-center gap-x-2">
          <VIcon icon="tabler-table" class="cursor-pointer" :color="viewMode === 'table' ? 'primary' : 'grey'" @click="viewMode = 'table'"/>
          <VIcon icon="tabler-mist" class="cursor-pointer" :color="viewMode === 'card' ? 'primary' : 'grey'" @click="viewMode = 'card'"/>
        </div>
      </div>
    </div>

    <div class="justify-space-between align-center flex-wrap gap-4 pb-4">
      <!--      <VCard>-->
      <!--        <VCardText>-->
      <VWindow v-model="currentTab">
        <VWindowItem value="item-1">
          <VExpansionPanels  class="no-icon-rotate" variant="accordion">
            <VCard class="mb-6" v-for="(currentSession, index) in currentSessionList" :key="currentSession.id">
              <VExpansionPanel>
                <VExpansionPanelTitle disable-icon-rotate expand-icon="tabler-plus" collapse-icon="tabler-minus">
                  <VCardText class="pb-0">
                    <!-- Row 1 -->
                    <VRow class="align-center justify-space-between">
                      <VCol cols="12" md="6" class="d-flex align-center">
                        <div class="text-h6">Session <strong>{{ currentSession.id }}</strong></div>
                      </VCol>

                      <VCol cols="12" md="6" class="d-flex align-center justify-end text-right">
                        <span class="text-caption grey--text mr-2">Runtime:</span>
                        <strong class="mr-2">10D 58M</strong>
                        <div style="width: 1px; height: 24px; background-color: #ccc;" class="mx-2" />
                        <span class="text-caption grey--text">
          <span class="font-weight-bold">Dec 6</span>, 2024 23:30
          <VIcon icon="tabler-arrow-right" size="20" />
          <span class="font-weight-bold">Dec 17</span>, 2024 23:30
        </span>
                      </VCol>
                    </VRow>

                    <!-- Row 2 -->
                    <VRow>
                      <VCol cols="12">
                        <div class="d-flex align-center justify-start flex-wrap">
                          <template v-for="(item, index) in stats" :key="index">
                            <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                              <div>
                <span class="text-caption grey--text">
                  {{ item.label }}
                  <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
                  <br />
                  <span :class="['text-sub-caption', item.color]">
                    {{ item.value }}
                  </span>
                </span>
                              </div>
                              <div
                                v-if="index !== stats.length - 1"
                                style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                              />
                            </div>
                          </template>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </VExpansionPanelTitle>
                <VExpansionPanelText v-if="viewMode === 'card'">
                  <div class="mb-4">
                    <VRow>
                      <!-- Buy Info -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0" style="color:green;">Buy info
                          <VProgressLinear
                            model-value="100"
                            color="green"
                            height="3"
                          />
                        </VCardTitle>

                        <VCard border class="pa-3 buy-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="success" class="text-white">Buy</VChip>
                              <span class="font-weight-bold text-black text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Sell Info -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0" style="color:red;">Sell info
                          <VProgressLinear
                            model-value="100"
                            color="red"
                            height="3"
                          />
                        </VCardTitle>
                        <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="error" class="text-white">Sell</VChip>
                              <span class="font-weight-bold text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Profit Summary -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0">Profit
                          <VProgressLinear
                            height="3"
                          />
                        </VCardTitle>
                        <VCard border class="pa-3 profit-card">
                          <VRow>
                            <VCol cols="6" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0">2.50</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Fees:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-0">Profit %:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-0">2.02%</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Profit Avg Price:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">1.01%</VCol>
                            <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                          </VRow>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                  <div>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-alert-triangle" class="mr-1" style="background-color:red"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-alert-circle" class="mr-1" style="background-color:orange"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-info-circle" class="mr-1" style="background-color:blue"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                  </div>
                  <VCard>
                    <VRow>
                      <!-- Buy Info -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 buy-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="success" class="text-white">Buy</VChip>
                              <span class="font-weight-bold text-black text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Sell Info -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 sell-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="error" class="text-white">Sell</VChip>
                              <span class="font-weight-bold text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Profit Summary -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 profit-card">
                          <VRow>
                            <VCol cols="6" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0">2.50</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Fees:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-0">Profit %:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-0">2.02%</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Profit Avg Price:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">1.01%</VCol>
                            <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                          </VRow>
                        </VCard>
                      </VCol>
                    </VRow>
                  </VCard>
                </VExpansionPanelText>
                <VExpansionPanelText v-else>
                  <VCardText>
                    <div class="mb-4">
                      <VRow>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Current Market Price <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">198.76</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Average Price <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">225.25</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Market Vs Average <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">-11.76%</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">25399.12</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">3160.37</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT Available <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">22238.75</span></span>
                            </div>
                          </div>
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol cols="12" v-for="(item, index) in currentSession.trades" :key="index">
                          <VCard :class="item.side === 'BUY' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                            <VRow>
                              <VCol cols="5" class="pb-2">
                                <div class="align-center gap-x-2" >
                                  <VChip :color="item.side === 'BUY' ? 'success' : 'error'" text-color="white" label size="small">
                                    {{ item.side }}
                                  </VChip>
                                  <span class="text-caption font-weight-bold pl-2">{{ item.comment }}</span>
                                </div>
                              </VCol>
                              <VCol cols="3" class="pb-2">
                                <div class="text-caption">
                                  <span class="font-weight-bold">{{ item.executed_quantity }}</span> Qty @
                                  <span class="font-weight-bold">{{ item.executed_price }}</span>
                                </div>
                              </VCol>
                              <VCol cols="4" class="pb-2">
                                <div class="text-right text-caption">
                                  <div v-if="item.side === 'BUY'"><strong>Open:</strong> <span class="text-caption font-weight-bold">{{ formatDateTime(item.created_at) }}</span></div>
                                </div>
                              </VCol>
                            </VRow>
                            <VRow class="mt-0">
                              <VCol cols="5" class="pt-2">
                                <div class="align-center gap-x-2" >
                                  <span class="text-caption pl-13 font-weight-bold">Trade ID : {{ item.id }}</span>
                                </div>
                              </VCol>
                              <VCol cols="3" class="pt-2">
                                <div class="text-caption">
                                  <span class="font-weight-bold">Total : {{ item.executed_amount }}</span>
                                  <span class="text-grey text-uppercase">USDT</span>
                                </div>
                              </VCol>
                              <VCol cols="4" class="pt-2">
                                <div class="text-right text-caption">
                                  <div><strong>Close:</strong> <span class="text-caption font-weight-bold">{{ isNull(item.closed_at) ? '-' : formatDateTime(item.closed_at) }}</span></div>
                                </div>
                              </VCol>
                            </VRow>
                            <!-- Divider for Sell only -->
                            <VDivider v-if="item.side === 'SELL'" class="my-2" />

                            <!-- Profit Row for Sell -->
                            <div
                              v-if="item.side === 'SELL'"
                              class="d-flex justify-space-between flex-wrap text-caption">
                              <span class="text-caption"><strong>Gross Profit :</strong> <span class="font-weight-bold"> {{ item.gross_profit }}</span></span>
                              <span class="text-caption"><strong>Fees :</strong><span class="font-weight-bold"> {{ item.exchange_fee_buy_sell }}</span></span>
                              <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.gross_profit }}</span></span>
                              <span class="text-caption"><strong>Profit to Tank :</strong><span class="font-weight-bold"> {{ item.profit_avg }}</span></span>
                              <span class="text-caption font-weight-bold">
                                  <strong>Net Profit :</strong>
                                  <VChip color="success" size="small" class="font-bold ml-1">
                                    {{ item.used_profit }} [{{ item.used_profit }}]
                                  </VChip>
                                </span>
                            </div>
                          </VCard>
                        </VCol>
                      </VRow>
                    </div>
                  </VCardText>

                </VExpansionPanelText>
              </VExpansionPanel>
            </VCard>

          </VExpansionPanels>
        </VWindowItem>
        <VWindowItem value="item-2">
          <VExpansionPanels class="no-icon-rotate" variant="accordion">
            <VCard class="mb-6"  v-for="(previousSession, index) in previousSessionList" :key="previousSession.id">
              <VExpansionPanel>
                <VExpansionPanelTitle disable-icon-rotate expand-icon="tabler-plus" collapse-icon="tabler-minus">
                  <VCardText class="pb-0">
                    <!-- Row 1 -->
                    <VRow class="align-center justify-space-between">
                      <VCol cols="12" md="6" class="d-flex align-center">
                        <div class="text-h6">Session <strong>{{ previousSession.id }}</strong></div>
                      </VCol>

                      <VCol cols="12" md="6" class="d-flex align-center justify-end text-right">
                        <span class="text-caption grey--text mr-2">Runtime:</span>
                        <strong class="mr-2">10D 58M</strong>
                        <div style="width: 1px; height: 24px; background-color: #ccc;" class="mx-2" />
                        <span class="text-caption grey--text">
          <span class="font-weight-bold">Dec 6</span>, 2024 23:30
          <VIcon icon="tabler-arrow-right" size="20" />
          <span class="font-weight-bold">Dec 17</span>, 2024 23:30
        </span>
                      </VCol>
                    </VRow>

                    <!-- Row 2 -->
                    <VRow>
                      <VCol cols="12">
                        <div class="d-flex align-center justify-start flex-wrap">
                          <template v-for="(item, index) in stats" :key="index">
                            <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                              <div>
                <span class="text-caption grey--text">
                  {{ item.label }}
                  <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
                  <br />
                  <span :class="['text-sub-caption', item.color]">
                    {{ item.value }}
                  </span>
                </span>
                              </div>
                              <div
                                v-if="index !== stats.length - 1"
                                style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                              />
                            </div>
                          </template>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </VExpansionPanelTitle>

                <VExpansionPanelText v-if="viewMode === 'card'">
                  <div class="mb-4">
                    <VRow>
                      <!-- Buy Info -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0" style="color:green;">Buy info
                          <VProgressLinear
                            model-value="100"
                            color="green"
                            height="3"
                          />
                        </VCardTitle>

                        <VCard border class="pa-3 buy-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="success" class="text-white">Buy</VChip>
                              <span class="font-weight-bold text-black text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Sell Info -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0" style="color:red;">Sell info
                          <VProgressLinear
                            model-value="100"
                            color="red"
                            height="3"
                          />
                        </VCardTitle>
                        <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="error" class="text-white">Sell</VChip>
                              <span class="font-weight-bold text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Profit Summary -->
                      <VCol cols="12" md="4">
                        <VCardTitle class="text-center pl-0 pr-0">Profit
                          <VProgressLinear
                            height="3"
                          />
                        </VCardTitle>
                        <VCard border class="pa-3 profit-card">
                          <VRow>
                            <VCol cols="6" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0">2.50</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Fees:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-0">Profit %:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-0">2.02%</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Profit Avg Price:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">1.01%</VCol>
                            <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                          </VRow>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                  <div>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-alert-triangle" class="mr-1" style="background-color:red"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-alert-circle" class="mr-1" style="background-color:orange"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                    <VCard class="mb-4">
                      <VCardTitle class="border-bg-block"> <VIcon icon="tabler-info-circle" class="mr-1" style="background-color:blue"/> Insufficient Balance</VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            <VRow>
                              <VCol cols="4">
                                <VChip color="error" class="text-white">Sell</VChip>
                                <span class="font-weight-bold pl-2 pr-4">Cover 4</span>
                                <VChip size="small">-2% X1</VChip>
                              </VCol>
                              <VCol cols="2" class="text-caption">Close<br><span class="font-weight-bold">Dec 10, 2024 - 22:17</span></VCol>
                              <VCol cols="2" class="text-caption">Trade ID<br><span class="font-weight-bold">50242660</span></VCol>
                              <VCol cols="4">
                                <div class="d-flex justify-space-between text-caption">
                                  <div class="text-left">
                                    <div>Price</div>
                                    <div class="font-weight-bold">3634.04</div>
                                  </div>

                                  <div class="text-center">
                                    <div>Quantity</div>
                                    <div class="font-weight-bold">0.0291</div>
                                  </div>

                                  <div class="text-right">
                                    <div>Amount</div>
                                    <div class="font-weight-bold">105.75</div>
                                  </div>
                                </div>
                              </VCol>

                            </VRow>
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                  </div>
                  <VCard>
                    <VRow>
                      <!-- Buy Info -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 buy-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="success" class="text-white">Buy</VChip>
                              <span class="font-weight-bold text-black text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Sell Info -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 sell-card">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center gap-2">
                              <VChip color="error" class="text-white">Sell</VChip>
                              <span class="font-weight-bold text-left">Cover 4</span>
                            </div>
                            <div class="d-flex align-center gap-x-4">
                              <VChip size="small">-2% X1</VChip>
                            </div>
                          </div>
                          <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                          <VRow class="mt-2">
                            <VCol cols="3" class="text-caption grey--text">Trade ID<br><span class="font-weight-bold">502426</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                            <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                          </VRow>
                        </VCard>
                      </VCol>

                      <!-- Profit Summary -->
                      <VCol cols="12" md="4">
                        <VCard border class="pa-3 profit-card">
                          <VRow>
                            <VCol cols="6" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0">2.50</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Fees:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-0">Profit %:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-0">2.02%</VCol>
                            <VCol cols="6" class="text-caption grey--text pb-0 pt-1">Profit Avg Price:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-0 pt-1">1.01%</VCol>
                            <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                            <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                          </VRow>
                        </VCard>
                      </VCol>
                    </VRow>
                  </VCard>
                </VExpansionPanelText>
                <VExpansionPanelText v-else>
                  <VCardText>
                    <div class="mb-4">
                      <VRow>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Current Market Price <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">198.76</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Average Price <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">225.25</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">Market Vs Average <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">-11.76%</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">25399.12</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">3160.37</span></span>
                            </div>
                          </div>
                        </VCol>
                        <VCol cols="12" md="2">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
                              <span class="text-caption grey--text">USDT Available <VIcon icon="tabler-info-circle" size="14" /><br />
                              <span class="text-sub-caption">22238.75</span></span>
                            </div>
                          </div>
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol cols="12" v-for="(item, index) in previousSession.trades" :key="index">
                          <VCard :class="item.side === 'BUY' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                            <VRow>
                              <VCol cols="5" class="pb-2">
                                <div class="align-center gap-x-2" >
                                  <VChip :color="item.side === 'BUY' ? 'success' : 'error'" text-color="white" label size="small">
                                    {{ item.side }}
                                  </VChip>
                                  <span class="text-caption font-weight-bold pl-2">{{ item.comment }}</span>
                                </div>
                              </VCol>
                              <VCol cols="3" class="pb-2">
                                <div class="text-caption">
                                  <span class="font-weight-bold">{{ item.executed_quantity }}</span> Qty @
                                  <span class="font-weight-bold">{{ item.executed_price }}</span>
                                </div>
                              </VCol>
                              <VCol cols="4" class="pb-2">
                                <div class="text-right text-caption">
                                  <div v-if="item.side === 'BUY'"><strong>Open:</strong> <span class="text-caption font-weight-bold">{{ formatDateTime(item.created_at) }}</span></div>
                                </div>
                              </VCol>
                            </VRow>
                            <VRow class="mt-0">
                              <VCol cols="5" class="pt-2">
                                <div class="align-center gap-x-2" >
                                  <span class="text-caption pl-13 font-weight-bold">Trade ID : {{ item.id }}</span>
                                </div>
                              </VCol>
                              <VCol cols="3" class="pt-2">
                                <div class="text-caption">
                                  <span class="font-weight-bold">Total : {{ item.executed_amount }}</span>
                                  <span class="text-grey text-uppercase">USDT</span>
                                </div>
                              </VCol>
                              <VCol cols="4" class="pt-2">
                                <div class="text-right text-caption">
                                  <div><strong>Close:</strong> <span class="text-caption font-weight-bold">{{ isNull(item.closed_at) ? '-' : formatDateTime(item.closed_at) }}</span></div>
                                </div>
                              </VCol>
                            </VRow>
                            <!-- Divider for Sell only -->
                            <VDivider v-if="item.side === 'SELL'" class="my-2" />

                            <!-- Profit Row for Sell -->
                            <div
                              v-if="item.side === 'SELL'"
                              class="d-flex justify-space-between flex-wrap text-caption">
                              <span class="text-caption"><strong>Gross Profit :</strong> <span class="font-weight-bold"> {{ item.gross_profit }}</span></span>
                              <span class="text-caption"><strong>Fees :</strong><span class="font-weight-bold"> {{ item.exchange_fee_buy_sell }}</span></span>
                              <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.gross_profit }}</span></span>
                              <span class="text-caption"><strong>Profit to Tank :</strong><span class="font-weight-bold"> {{ item.profit_avg }}</span></span>
                              <span class="text-caption font-weight-bold">
                                  <strong>Net Profit :</strong>
                                  <VChip color="success" size="small" class="font-bold ml-1">
                                    {{ item.used_profit }} [{{ item.used_profit }}]
                                  </VChip>
                                </span>
                            </div>
                          </VCard>
                        </VCol>
                      </VRow>
                    </div>
                  </VCardText>

                </VExpansionPanelText>
              </VExpansionPanel>
            </VCard>
          </VExpansionPanels>
        </VWindowItem>
      </VWindow>
      <!--        </VCardText>-->
      <!--      </VCard>-->
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
        <VIcon icon="tabler-table" class="cursor-pointer" :color="viewMode === 'table' ? 'primary' : 'grey'" @click="viewMode = 'table'"/>
        <VIcon icon="tabler-mist" class="cursor-pointer" :color="viewMode === 'card' ? 'primary' : 'grey'" @click="viewMode = 'card'"/>
      </div>
    </div>


    <VCard>
      <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
        <!-- Left: Title -->
        <span class="font-weight-bold">
        <span class="pr-2">ETH</span>
      <VChip color="success">Active</VChip>
      </span>

        <!-- Right: Statuses -->
        <div class="d-flex align-center gap-x-4">
          <VBtn variant="outlined" icon="tabler-download" rounded>
          </VBtn>
          <VBtn
            icon="tabler-edit"
            :to="{ name: 'create-bot' }"
            rounded
          >
          </VBtn>
        </div>
      </VCardText>
      <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
        <!-- Left: Title -->
        <VList class="card-list">
          <VListItem>
            <div class="d-flex align-center gap-2">
              <VAvatar>
                <img :src="Group">
              </VAvatar>
              <VAvatar style="margin-left: -25px">
                <img :src="Frame">
              </VAvatar>
              <div>
                <div class="font-weight-medium">ETH/USDT</div>
                <h3>1481.71</h3>
              </div>
            </div>
          </VListItem>
        </VList>

        <!-- Right: Statuses -->
        <div class="d-flex align-center gap-x-4">
          <span class="text-caption grey--text text-right" style="font-size: 13px!important;">Sessions Closed<br /><span class="text-subCaption">10</span></span>
        </div>
      </VCardText>
      <VCardText class="justify-space-between align-center flex-wrap gap-4">
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
      </VCardText>
      <VDivider />
      <VCardText class="d-flex justify-space-between align-center flex-wrap pt-2 pb-2" style="border-radius: 0px 0px 10px 10px;background-color: #fafafa;border-top: 1px solid #e2e8f0;">
        <!-- Left: Title -->
        <div class="d-flex align-center gap-x-4">
          <span class="text-sub-caption-mobile">Day’s P&L (7h:27m)<br /><span class="text-subCaption" style="color: green">$ 6.30</span></span>
        </div>
        <!-- Right: Statuses -->
        <div class="d-flex align-center gap-x-4">
          <span class="text-sub-caption-mobile text-right">Overall P&L<br /><span class="text-subCaption" style="color: green">$ 166.30</span></span>
        </div>
      </VCardText>
    </VCard>
    <div class="mt-4 mb-4">
      <VTabs v-model="currentTab">
        <VTab class="pl-2" style="padding: 0px 10px;">Current Session</VTab>
        <VTab class="pl-2" style="padding: 0px 10px;">
          <div class="d-flex align-center gap-1">
            <span>Previous Sessions</span>
            <VBadge
              color="secondary"
              content="4"
              inline
              bordered
              offset-x="2"
              offset-y="0"
            />
          </div>
        </VTab>
      </VTabs>
    </div>
    <div class="justify-space-between align-center flex-wrap gap-4 pb-4">
      <VCard>
        <VWindow v-model="currentTab">
          <VWindowItem value="item-1">
            <VExpansionPanels class="no-icon-rotate" multiple>
              <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle disable-icon-rotate>
                  <div class="d-flex justify-space-between align-center w-100">
                    <div class="text-h6">
                      Session <strong>36950514</strong>
                    </div>
                    <span class="text-h6 text-success">$19.71</span>
                  </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="mb-4 mt-2">
                    <VRow dense class="text-center pl-4 pr-4">
                      <!-- Row 1 -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between">
                          <!-- Column 1 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Trades closed</span><br>
                            <strong class="font-weight-bold text-sub-caption">7</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 2 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Top positions sold</span><br>
                            <strong class="font-weight-bold text-sub-caption">0</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 3 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Sliding covers</span><br>
                            <strong class="font-weight-bold text-sub-caption">22</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />

                      <!-- Row: Opening / Closing / Profit Used -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Opening price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4016.66</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Closing price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4079.54</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Profit used<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Row: Available Profit / Runtime -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Available Profit -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Available profit<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">2.42</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Runtime -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Runtime</span><br>
                            <strong class="font-weight-bold text-sub-caption">10D 58M</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Current Market Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">198.76</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Average Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">225.25</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Market Vs Average<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-11.76%</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">25399.12</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">3160.37</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Available <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">22238.75</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Footer -->
                      <VCol cols="12">
                        <div class="text-center pt-2 pb-2">
                          <strong class="font-weight-bold text-sub-caption">Session Trades - 12 Open</strong>
                        </div>
                      </VCol>
                      <VDivider />
                    </VRow>
                  </div>
                  <div v-if="viewMode === 'card'">
                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card mb-4">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>

                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                  </div>
                  <div v-else>
                    <VRow>
                      <VCol cols="12" class="pb-1 pt-1" v-for="(item, index) in tradeItems" :key="index">
                        <VCard :class="item.type === 'Buy' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                          <VRow>
                            <VCol cols="3" class="pb-1">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption" :class="item.type === 'Buy' ? 'text-success' : 'text-error'">{{ item.type }}</span>
                                <!--                                <VChip :color="item.type === 'Buy' ? 'success' : 'error'" text-color="white" label size="small">-->
                                <!--                                  {{ item.type }}-->
                                <!--                                </VChip>-->
                              </div>
                            </VCol>
                            <VCol cols="9" class="pb-1">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">{{ item.qty }}</span> Qty @
                                <span class="font-weight-bold">{{ item.rate }}</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="7" class="pt-1 pb-1">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">{{ item.title }}</span>
                              </div>
                            </VCol>
                            <VCol cols="5" class="pl-0 pt-1 pb-1">
                              <div class="text-right align-center gap-x-2">
                                <span class="text-caption font-weight-bold">Total : {{ item.total }}</span>
                                <span class="text-caption text-grey">USDT</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="5" class="pb-1 pt-1 pr-0">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">ID : {{ item.tradeId }}</span>
                              </div>
                            </VCol>
                            <VCol cols="7" class="pb-1 pt-1 pl-0">
                              <div class="text-right text-caption">
                                <div><span class="font-weight-bold">{{ item.open }}</span></div>
                              </div>
                            </VCol>
                          </VRow>
                          <!-- Divider for Sell only -->
                          <VDivider v-if="item.type === 'Sell'" class="my-2" />

                          <!-- Profit Row for Sell -->
                          <div
                            v-if="item.type === 'Sell'"
                            class="d-flex justify-space-between flex-wrap text-caption">
                            <span class="text-caption"><strong>GP :</strong> <span class="font-weight-bold"> {{ item.gross }}</span></span>
                            <span class="text-caption "><strong>Fees :</strong><span class="font-weight-bold"> {{ item.fees }}</span></span>
                            <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.profit }}</span></span>
                            <span class="text-caption"><strong>Tank :</strong><span class="font-weight-bold"> {{ item.toTank }}</span></span>
                            <div class="d-flex justify-space-between align-center w-100">
    <span class="text-caption font-weight-bold">
      <strong>Net Profit :</strong>
    </span>
                              <VChip color="success" size="small" class="font-bold">
                                {{ item.net }} [{{ item.percent }}]
                              </VChip>
                            </div>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VWindowItem>
          <VWindowItem value="item-2">
            <VExpansionPanels  class="no-icon-rotate" multiple>
              <VExpansionPanel style="margin-block-end: 0.5rem" expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle disable-icon-rotate>
                  <div class="d-flex justify-space-between align-center w-100">
                    <div class="text-h6">
                      Session <strong>36950514</strong>
                    </div>
                    <span class="text-h6 text-success">$19.71</span>
                  </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="mb-4 mt-2">
                    <VRow dense class="text-center pl-4 pr-4">
                      <!-- Row 1 -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between">
                          <!-- Column 1 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Trades closed</span><br>
                            <strong class="font-weight-bold text-sub-caption">7</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 2 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Top positions sold</span><br>
                            <strong class="font-weight-bold text-sub-caption">0</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 3 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Sliding covers</span><br>
                            <strong class="font-weight-bold text-sub-caption">22</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />

                      <!-- Row: Opening / Closing / Profit Used -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Opening price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4016.66</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Closing price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4079.54</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Profit used<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Row: Available Profit / Runtime -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Available Profit -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Available profit<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">2.42</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Runtime -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Runtime</span><br>
                            <strong class="font-weight-bold text-sub-caption">10D 58M</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Current Market Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">198.76</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Average Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">225.25</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Market Vs Average<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-11.76%</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">25399.12</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">3160.37</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Available <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">22238.75</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Footer -->
                      <VCol cols="12">
                        <div class="text-center pt-2 pb-2">
                          <strong class="font-weight-bold text-sub-caption">Session Trades - 12 Open</strong>
                        </div>
                      </VCol>
                      <VDivider />
                    </VRow>
                  </div>
                  <div v-if="viewMode === 'card'">
                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card mb-4">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>

                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                  </div>
                  <div v-else>
                    <VRow>
                      <VCol cols="12" class="pb-1 pt-1" v-for="(item, index) in tradeItems" :key="index">
                        <VCard :class="item.type === 'Buy' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                          <VRow>
                            <VCol cols="3" class="pb-2">
                              <div class="align-center gap-x-2" >
                                <VChip :color="item.type === 'Buy' ? 'success' : 'error'" text-color="white" label size="small">
                                  {{ item.type }}
                                </VChip>
                              </div>
                            </VCol>
                            <VCol cols="9" class="pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">{{ item.qty }}</span> Qty @
                                <span class="font-weight-bold">{{ item.rate }}</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="7" class="pt-1 pb-2">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">{{ item.title }}</span>
                              </div>
                            </VCol>
                            <VCol cols="5" class="pl-0 pt-1 pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">Total : {{ item.total }}</span>
                                <span class="text-grey text-uppercase">USDT</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="5" class="pb-2 pt-1 pr-0">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">ID : {{ item.tradeId }}</span>
                              </div>
                            </VCol>
                            <VCol cols="7" class="pb-2 pt-1 pl-0">
                              <div class="text-right text-caption">
                                <div><span class="font-weight-bold">{{ item.open }}</span></div>
                              </div>
                            </VCol>
                          </VRow>
                          <!-- Divider for Sell only -->
                          <VDivider v-if="item.type === 'Sell'" class="my-2" />

                          <!-- Profit Row for Sell -->
                          <div
                            v-if="item.type === 'Sell'"
                            class="d-flex justify-space-between flex-wrap text-caption"
                          >
                            <span class="text-caption"><strong>GP :</strong> <span class="font-weight-bold"> {{ item.gross }}</span></span>
                            <span class="text-caption "><strong>Fees :</strong><span class="font-weight-bold"> {{ item.fees }}</span></span>
                            <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.profit }}</span></span>
                            <span class="text-caption"><strong>Tank :</strong><span class="font-weight-bold"> {{ item.toTank }}</span></span>
                            <div class="d-flex justify-space-between align-center w-100 mt-2">
    <span class="text-caption font-weight-bold">
      <strong>Net Profit :</strong>
    </span>
                              <VChip color="success" size="small" class="font-bold">
                                {{ item.net }} [{{ item.percent }}]
                              </VChip>
                            </div>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel style="margin-block-end: 0.5rem" expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle disable-icon-rotate>
                  <div class="d-flex justify-space-between align-center w-100">
                    <div class="text-h6">
                      Session <strong>36950514</strong>
                    </div>
                    <span class="text-h6 text-success">$19.71</span>
                  </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="mb-4 mt-2">
                    <VRow dense class="text-center pl-4 pr-4">
                      <!-- Row 1 -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between">
                          <!-- Column 1 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Trades closed</span><br>
                            <strong class="font-weight-bold text-sub-caption">7</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 2 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Top positions sold</span><br>
                            <strong class="font-weight-bold text-sub-caption">0</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 3 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Sliding covers</span><br>
                            <strong class="font-weight-bold text-sub-caption">22</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />

                      <!-- Row: Opening / Closing / Profit Used -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Opening price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4016.66</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Closing price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4079.54</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Profit used<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Row: Available Profit / Runtime -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Available Profit -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Available profit<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">2.42</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Runtime -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Runtime</span><br>
                            <strong class="font-weight-bold text-sub-caption">10D 58M</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Current Market Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">198.76</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Average Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">225.25</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Market Vs Average<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-11.76%</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">25399.12</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">3160.37</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Available <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">22238.75</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Footer -->
                      <VCol cols="12">
                        <div class="text-center pt-2 pb-2">
                          <strong class="font-weight-bold text-sub-caption">Session Trades - 12 Open</strong>
                        </div>
                      </VCol>
                      <VDivider />
                    </VRow>
                  </div>
                  <div v-if="viewMode === 'card'">
                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card mb-4">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>

                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                  </div>
                  <div v-else>
                    <VRow>
                      <VCol cols="12" class="pb-1 pt-1" v-for="(item, index) in tradeItems" :key="index">
                        <VCard :class="item.type === 'Buy' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                          <VRow>
                            <VCol cols="3" class="pb-2">
                              <div class="align-center gap-x-2" >
                                <VChip :color="item.type === 'Buy' ? 'success' : 'error'" text-color="white" label size="small">
                                  {{ item.type }}
                                </VChip>
                              </div>
                            </VCol>
                            <VCol cols="9" class="pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">{{ item.qty }}</span> Qty @
                                <span class="font-weight-bold">{{ item.rate }}</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="7" class="pt-1 pb-2">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">{{ item.title }}</span>
                              </div>
                            </VCol>
                            <VCol cols="5" class="pl-0 pt-1 pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">Total : {{ item.total }}</span>
                                <span class="text-grey text-uppercase">USDT</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="5" class="pb-2 pt-1 pr-0">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">ID : {{ item.tradeId }}</span>
                              </div>
                            </VCol>
                            <VCol cols="7" class="pb-2 pt-1 pl-0">
                              <div class="text-right text-caption">
                                <div><span class="font-weight-bold">{{ item.open }}</span></div>
                              </div>
                            </VCol>
                          </VRow>
                          <!-- Divider for Sell only -->
                          <VDivider v-if="item.type === 'Sell'" class="my-2" />

                          <!-- Profit Row for Sell -->
                          <div
                            v-if="item.type === 'Sell'"
                            class="d-flex justify-space-between flex-wrap text-caption"
                          >
                            <span class="text-caption"><strong>GP :</strong> <span class="font-weight-bold"> {{ item.gross }}</span></span>
                            <span class="text-caption "><strong>Fees :</strong><span class="font-weight-bold"> {{ item.fees }}</span></span>
                            <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.profit }}</span></span>
                            <span class="text-caption"><strong>Tank :</strong><span class="font-weight-bold"> {{ item.toTank }}</span></span>
                            <div class="d-flex justify-space-between align-center w-100 mt-2">
    <span class="text-caption font-weight-bold">
      <strong>Net Profit :</strong>
    </span>
                              <VChip color="success" size="small" class="font-bold">
                                {{ item.net }} [{{ item.percent }}]
                              </VChip>
                            </div>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel style="margin-block-end: 0.5rem" expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle disable-icon-rotate>
                  <div class="d-flex justify-space-between align-center w-100">
                    <div class="text-h6">
                      Session <strong>36950514</strong>
                    </div>
                    <span class="text-h6 text-success">$19.71</span>
                  </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="mb-4 mt-2">
                    <VRow dense class="text-center pl-4 pr-4">
                      <!-- Row 1 -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between">
                          <!-- Column 1 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Trades closed</span><br>
                            <strong class="font-weight-bold text-sub-caption">7</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 2 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Top positions sold</span><br>
                            <strong class="font-weight-bold text-sub-caption">0</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 3 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Sliding covers</span><br>
                            <strong class="font-weight-bold text-sub-caption">22</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />

                      <!-- Row: Opening / Closing / Profit Used -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Opening price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4016.66</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Closing price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4079.54</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Profit used<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Row: Available Profit / Runtime -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Available Profit -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Available profit<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">2.42</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Runtime -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Runtime</span><br>
                            <strong class="font-weight-bold text-sub-caption">10D 58M</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Current Market Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">198.76</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Average Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">225.25</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Market Vs Average<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-11.76%</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">25399.12</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">3160.37</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Available <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">22238.75</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Footer -->
                      <VCol cols="12">
                        <div class="text-center pt-2 pb-2">
                          <strong class="font-weight-bold text-sub-caption">Session Trades - 12 Open</strong>
                        </div>
                      </VCol>
                      <VDivider />
                    </VRow>
                  </div>
                  <div v-if="viewMode === 'card'">
                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card mb-4">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>

                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                  </div>
                  <div v-else>
                    <VRow>
                      <VCol cols="12" class="pb-1 pt-1" v-for="(item, index) in tradeItems" :key="index">
                        <VCard :class="item.type === 'Buy' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                          <VRow>
                            <VCol cols="3" class="pb-2">
                              <div class="align-center gap-x-2" >
                                <VChip :color="item.type === 'Buy' ? 'success' : 'error'" text-color="white" label size="small">
                                  {{ item.type }}
                                </VChip>
                              </div>
                            </VCol>
                            <VCol cols="9" class="pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">{{ item.qty }}</span> Qty @
                                <span class="font-weight-bold">{{ item.rate }}</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="7" class="pt-1 pb-2">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">{{ item.title }}</span>
                              </div>
                            </VCol>
                            <VCol cols="5" class="pl-0 pt-1 pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">Total : {{ item.total }}</span>
                                <span class="text-grey text-uppercase">USDT</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="5" class="pb-2 pt-1 pr-0">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">ID : {{ item.tradeId }}</span>
                              </div>
                            </VCol>
                            <VCol cols="7" class="pb-2 pt-1 pl-0">
                              <div class="text-right text-caption">
                                <div><span class="font-weight-bold">{{ item.open }}</span></div>
                              </div>
                            </VCol>
                          </VRow>
                          <!-- Divider for Sell only -->
                          <VDivider v-if="item.type === 'Sell'" class="my-2" />

                          <!-- Profit Row for Sell -->
                          <div
                            v-if="item.type === 'Sell'"
                            class="d-flex justify-space-between flex-wrap text-caption"
                          >
                            <span class="text-caption"><strong>GP :</strong> <span class="font-weight-bold"> {{ item.gross }}</span></span>
                            <span class="text-caption "><strong>Fees :</strong><span class="font-weight-bold"> {{ item.fees }}</span></span>
                            <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.profit }}</span></span>
                            <span class="text-caption"><strong>Tank :</strong><span class="font-weight-bold"> {{ item.toTank }}</span></span>
                            <div class="d-flex justify-space-between align-center w-100 mt-2">
    <span class="text-caption font-weight-bold">
      <strong>Net Profit :</strong>
    </span>
                              <VChip color="success" size="small" class="font-bold">
                                {{ item.net }} [{{ item.percent }}]
                              </VChip>
                            </div>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel style="margin-block-end: 0.5rem" expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle disable-icon-rotate>
                  <div class="d-flex justify-space-between align-center w-100">
                    <div class="text-h6">
                      Session <strong>36950514</strong>
                    </div>
                    <span class="text-h6 text-success">$19.71</span>
                  </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <div class="mb-4 mt-2">
                    <VRow dense class="text-center pl-4 pr-4">
                      <!-- Row 1 -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between">
                          <!-- Column 1 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Trades closed</span><br>
                            <strong class="font-weight-bold text-sub-caption">7</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 2 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Top positions sold</span><br>
                            <strong class="font-weight-bold text-sub-caption">0</strong>
                          </div>

                          <!-- Vertical Divider -->
                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Column 3 -->
                          <div class="flex-1">
                            <span class="text-caption text-grey">Sliding covers</span><br>
                            <strong class="font-weight-bold text-sub-caption">22</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />

                      <!-- Row: Opening / Closing / Profit Used -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Opening price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4016.66</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Closing price</span><br>
                            <strong class="font-weight-bold text-sub-caption">4079.54</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Profit used<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Row: Available Profit / Runtime -->
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Available Profit -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Available profit<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">2.42</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 40px;" />

                          <!-- Runtime -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Runtime</span><br>
                            <strong class="font-weight-bold text-sub-caption">10D 58M</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <!-- Opening Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Current Market Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">198.76</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Closing Price -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Average Price <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">225.25</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <!-- Profit Used -->
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">Market Vs Average<VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">-11.76%</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="d-flex justify-space-between align-start">
                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Assigned <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">25399.12</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT In Trade <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">3160.37</strong>
                          </div>

                          <VDivider vertical class="mx-2" style="height: 65px;" />

                          <div class="text-center flex-1">
                            <span class="text-caption text-grey">USDT Available <VIcon icon="tabler-info-circle" size="14" /></span><br>
                            <strong class="font-weight-bold text-sub-caption">22238.75</strong>
                          </div>
                        </div>
                      </VCol>
                      <VDivider />
                      <!-- Footer -->
                      <VCol cols="12">
                        <div class="text-center pt-2 pb-2">
                          <strong class="font-weight-bold text-sub-caption">Session Trades - 12 Open</strong>
                        </div>
                      </VCol>
                      <VDivider />
                    </VRow>
                  </div>
                  <div v-if="viewMode === 'card'">
                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card mb-4">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>
                    <VCard class="mb-4" style="border: 1px solid rgb(240, 185, 11);">
                      <VCardTitle style="font-size: 12px;background-color: #ffdc6c;">Account has insufficient balance for requested action.</VCardTitle>
                      <div class="pa-3">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center gap-2">
                            <VChip color="success" class="text-white">Buy</VChip>
                            <span class="font-weight-bold text-black text-left">Cover 4</span>
                          </div>
                          <div class="d-flex align-center gap-x-4">
                            <VChip size="small">-2% X1</VChip>
                          </div>
                        </div>
                        <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                        <VRow class="mt-1">
                          <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                          <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                        </VRow>
                      </div>
                    </VCard>

                    <!-- Buy Info -->
                    <VCard border class="pa-3 buy-card">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="success" class="text-white">Buy</VChip>
                          <span class="font-weight-bold text-black text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Sell Info -->
                    <VCard border class="pa-3 sell-card" style="cursor: pointer;">
                      <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center gap-2">
                          <VChip color="error" class="text-white">Sell</VChip>
                          <span class="font-weight-bold text-left">Cover 4</span>
                        </div>
                        <div class="d-flex align-center gap-x-4">
                          <VChip size="small">-2% X1</VChip>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Open: <span class="font-weight-light-bold">Dec 10, 2024 - 22:17</span></div>
                      <VRow class="mt-1">
                        <VCol cols="3" class="text-caption grey--text">ID<br><span class="font-weight-bold">502426</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Price<br><span class="font-weight-bold">3634.04</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Quantity<br><span class="font-weight-bold">0.0291</span></VCol>
                        <VCol cols="3" class="text-caption grey--text">Amount<br><span class="font-weight-bold">105.75</span></VCol>
                      </VRow>
                    </VCard>
                    <!-- Profit Summary -->
                    <VCard border class="pa-3 profit-card">
                      <VRow>
                        <VCol cols="4" class="text-caption grey--text pb-0">Gross Profit:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0">2.50</VCol>
                        <VCol cols="3" class="text-caption grey--text pb-0 pl-0">Profit %:</VCol>
                        <VCol cols="3" class="text-sub-caption text-right pb-0">2.02%</VCol>
                        <VCol cols="2" class="text-caption grey--text pb-0 pt-1 pr-0">Fees:</VCol>
                        <VCol cols="4" class="text-sub-caption text-right pb-0 pt-1">0.47372728</VCol>
                        <VCol cols="4" class="text-caption grey--text pb-0 pt-1 pl-0 pr-0">Profit Avg Price:</VCol>
                        <VCol cols="2" class="text-sub-caption text-right pb-0 pt-1 pl-0">1.01%</VCol>
                        <VCol cols="6" class="text-caption font-weight-bold pb-1 pt-0">Net Profit:</VCol>
                        <VCol cols="6" class="text-sub-caption text-right pb-1 pt-0"><VChip color="success" class="ml-2" size="small">1.01 (0.98%)</VChip></VCol>
                      </VRow>
                    </VCard>
                  </div>
                  <div v-else>
                    <VRow>
                      <VCol cols="12" class="pb-1 pt-1" v-for="(item, index) in tradeItems" :key="index">
                        <VCard :class="item.type === 'Buy' ? 'buy-card' : 'sell-card pb-1'" class="pa-3">
                          <VRow>
                            <VCol cols="3" class="pb-2">
                              <div class="align-center gap-x-2" >
                                <VChip :color="item.type === 'Buy' ? 'success' : 'error'" text-color="white" label size="small">
                                  {{ item.type }}
                                </VChip>
                              </div>
                            </VCol>
                            <VCol cols="9" class="pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">{{ item.qty }}</span> Qty @
                                <span class="font-weight-bold">{{ item.rate }}</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="7" class="pt-1 pb-2">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">{{ item.title }}</span>
                              </div>
                            </VCol>
                            <VCol cols="5" class="pl-0 pt-1 pb-2">
                              <div class="text-right text-caption">
                                <span class="font-weight-bold">Total : {{ item.total }}</span>
                                <span class="text-grey text-uppercase">USDT</span>
                              </div>
                            </VCol>
                          </VRow>
                          <VRow class="mt-0">
                            <VCol cols="5" class="pb-2 pt-1 pr-0">
                              <div class="align-center gap-x-2" >
                                <span class="text-caption font-weight-bold">ID : {{ item.tradeId }}</span>
                              </div>
                            </VCol>
                            <VCol cols="7" class="pb-2 pt-1 pl-0">
                              <div class="text-right text-caption">
                                <div><span class="font-weight-bold">{{ item.open }}</span></div>
                              </div>
                            </VCol>
                          </VRow>
                          <!-- Divider for Sell only -->
                          <VDivider v-if="item.type === 'Sell'" class="my-2" />

                          <!-- Profit Row for Sell -->
                          <div
                            v-if="item.type === 'Sell'"
                            class="d-flex justify-space-between flex-wrap text-caption"
                          >
                            <span class="text-caption"><strong>GP :</strong> <span class="font-weight-bold"> {{ item.gross }}</span></span>
                            <span class="text-caption "><strong>Fees :</strong><span class="font-weight-bold"> {{ item.fees }}</span></span>
                            <span class="text-caption"><strong>Profit :</strong><span class="font-weight-bold"> {{ item.profit }}</span></span>
                            <span class="text-caption"><strong>Tank :</strong><span class="font-weight-bold"> {{ item.toTank }}</span></span>
                            <div class="d-flex justify-space-between align-center w-100 mt-2">
    <span class="text-caption font-weight-bold">
      <strong>Net Profit :</strong>
    </span>
                              <VChip color="success" size="small" class="font-bold">
                                {{ item.net }} [{{ item.percent }}]
                              </VChip>
                            </div>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VWindowItem>
        </VWindow>
      </VCard>
    </div>
  </div>

</template>
<style scoped>
.text-sub-caption{
  font-weight: 500;
  color:#475569;
}
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity)) !important;
}
.font-weight-light-bold{
  color: #475569;
  font-weight: 500;
}
.font-weight-bold{
  color: #475569;
}
.font-bold{
  font-weight: bold!important;
}
.sell-card{
  background-color: #fff3f3;
  border: 1px solid rgba(255, 72, 72, 0.31);
}
.buy-card{
  background-color: #f7fff5;
  border: 1px solid rgba(72, 200, 132, 0.6);
}
.profit-card{
  background-color: #f9fbff;
  border: 1px solid #cbd5e1;
}
.border-bg-block{
  border-radius: 10px 10px 0px 0px;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;
}
.v-expansion-panel{
  margin-block-end: unset!important;
  margin-block-start: unset!important;
}
.text-subCaption{
  font-weight: 700;
  color:#475569;
  font-size: 15px !important;
}
.text-sub-caption{
  font-weight: 500;
  color:#475569;
}
.text-sub-caption-mobile{
  font-weight: 500;
  color:#475569;
}
@media (min-width: 390px) and (max-width: 600px) {
  .text-caption{
    font-size: 13px !important;
  }
  .text-sub-caption{
    font-size: 13px !important;
  }
}
@media (max-width: 390px) {
  .text-sub-caption-mobile {
    font-size:12px!important;
  }
  .text-caption{
    font-size: 11px !important;
  }
  .text-sub-caption{
    font-size: 10px!important;
  }
}
</style>

