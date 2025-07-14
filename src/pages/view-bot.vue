<script setup>
import AppPageHeader from '@/components/AppPageHeader.vue'
import Frame from '@/assets/images/Frame.svg?url'
import Group from '@/assets/images/Group.svg?url'

const pageTitle = 'Bot Insight'
const breadcrumbs = [
  { title: 'Home', to: '/', icon: 'tabler-home' },
  { title: 'Bots', to: '/bots' },
  { title: '107543', to: '/view-bot' },
  { title: 'Bot Insight' }
]

const currentTab = ref('item-1')
const previousTab = ref('item-2')

const showDetails = ref(false)

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


</script>

<template>
  <AppPageHeader
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
  />

  <!-- Page content here -->
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
          :to="{ name: 'edit-bot' }"
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
  <VCardText class="justify-space-between align-center flex-wrap gap-4">


<VTabs v-model="currentTab">
    <VTab>Current Session</VTab>
  <VTab>
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
  </VCardText>

  <div class="justify-space-between align-center flex-wrap gap-4 pb-4">
    <VCard>
    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem value="item-1">
            <VExpansionPanels  class="no-icon-rotate" multiple>
              <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
                <VExpansionPanelTitle class="d-flex align-center" disable-icon-rotate>
                  <VCard class="mb-6" style="flex-grow: 1; margin-right: 15px;">
                    <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
                      <div class="d-flex align-center gap-2">
                        <div class="text-h6">Session <strong>36950514</strong></div>
                      </div>
                      <div class="d-flex align-center gap-x-4">
                        <span class="text-caption grey--text">Runtime:</span><strong>10D 58M</strong>
                        <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                        <span class="text-caption grey--text"><span class="font-weight-bold">Dec 6</span>, 2024 23:30 <VIcon icon="tabler-arrow-right" size="20" /> <span class="font-weight-bold">Dec 17</span>, 2024 23:30 </span>
                      </div>
                    </VCardText>
                    <VCardText>
                      <div class="d-flex align-center justify-space-between flex-wrap pt-4">
                        <template v-for="(item, index) in stats" :key="index">
                          <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                            <div>
          <span class="text-caption grey--text">
            {{ item.label }}
            <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
            <br />
            <span
              :class="['text-sub-caption', item.color]"
            >
              {{ item.value }}
            </span>
          </span>
                            </div>
                            <!-- Divider (skip for last item) -->
                            <div
                              v-if="index !== stats.length - 1"
                              style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                            />
                          </div>
                        </template>
                      </div>
                    </VCardText>

                  </VCard>

                </VExpansionPanelTitle>
                <VExpansionPanelText>
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
              </VExpansionPanel>
            </VExpansionPanels>
        </VWindowItem>
        <VWindowItem value="item-2">
          <VExpansionPanels multiple>
            <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
              <VExpansionPanelTitle class="d-flex align-center" disable-icon-rotate>
                <VCard class="mb-6" style="flex-grow: 1; margin-right: 15px;">
                  <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
                    <div class="d-flex align-center gap-2">
                      <div class="text-h6">Session <strong>36950514</strong></div>
                    </div>
                    <div class="d-flex align-center gap-x-4">
                      <span class="text-caption grey--text">Runtime:</span><strong>10D 58M</strong>
                      <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                      <span class="text-caption grey--text"><span class="font-weight-bold">Dec 6</span>, 2024 23:30 <VIcon icon="tabler-arrow-right" size="20" /> <span class="font-weight-bold">Dec 17</span>, 2024 23:30 </span>
                    </div>
                  </VCardText>
                  <VCardText>
                    <div class="d-flex align-center justify-space-between flex-wrap pt-4">
                      <template v-for="(item, index) in stats" :key="index">
                        <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                          <div>
          <span class="text-caption grey--text">
            {{ item.label }}
            <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
            <br />
            <span
              :class="['text-sub-caption', item.color]"
            >
              {{ item.value }}
            </span>
          </span>
                          </div>
                          <!-- Divider (skip for last item) -->
                          <div
                            v-if="index !== stats.length - 1"
                            style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                          />
                        </div>
                      </template>
                    </div>
                  </VCardText>

                </VCard>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
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
            </VExpansionPanel>
            <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
              <VExpansionPanelTitle class="d-flex align-center" disable-icon-rotate>
                <VCard class="mb-6" style="flex-grow: 1; margin-right: 15px;">
                  <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
                    <div class="d-flex align-center gap-2">
                      <div class="text-h6">Session <strong>36950514</strong></div>
                    </div>
                    <div class="d-flex align-center gap-x-4">
                      <span class="text-caption grey--text">Runtime:</span><strong>10D 58M</strong>
                      <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                      <span class="text-caption grey--text"><span class="font-weight-bold">Dec 6</span>, 2024 23:30 <VIcon icon="tabler-arrow-right" size="20" /> <span class="font-weight-bold">Dec 17</span>, 2024 23:30 </span>
                    </div>
                  </VCardText>
                  <VCardText>
                    <div class="d-flex align-center justify-space-between flex-wrap pt-4">
                      <template v-for="(item, index) in stats" :key="index">
                        <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                          <div>
          <span class="text-caption grey--text">
            {{ item.label }}
            <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
            <br />
            <span
              :class="['text-sub-caption', item.color]"
            >
              {{ item.value }}
            </span>
          </span>
                          </div>
                          <!-- Divider (skip for last item) -->
                          <div
                            v-if="index !== stats.length - 1"
                            style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                          />
                        </div>
                      </template>
                    </div>
                  </VCardText>

                </VCard>

              </VExpansionPanelTitle>
              <VExpansionPanelText>
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
            </VExpansionPanel>
            <VExpansionPanel expand-icon="tabler-plus" collapse-icon="tabler-minus">
              <VExpansionPanelTitle class="d-flex align-center" disable-icon-rotate>
                <VCard class="mb-6" style="flex-grow: 1; margin-right: 15px;">
                  <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
                    <div class="d-flex align-center gap-2">
                      <div class="text-h6">Session <strong>36950514</strong></div>
                    </div>
                    <div class="d-flex align-center gap-x-4">
                      <span class="text-caption grey--text">Runtime:</span><strong>10D 58M</strong>
                      <div style="width: 1px; height: 24px; background-color: #ccc;"></div>
                      <span class="text-caption grey--text"><span class="font-weight-bold">Dec 6</span>, 2024 23:30 <VIcon icon="tabler-arrow-right" size="20" /> <span class="font-weight-bold">Dec 17</span>, 2024 23:30 </span>
                    </div>
                  </VCardText>
                  <VCardText>
                    <div class="d-flex align-center justify-space-between flex-wrap pt-4">
                      <template v-for="(item, index) in stats" :key="index">
                        <div class="d-flex align-center" style="flex: 1; min-width: 120px;">
                          <div>
          <span class="text-caption grey--text">
            {{ item.label }}
            <VIcon v-if="item.icon" icon="tabler-info-circle" size="14" />
            <br />
            <span
              :class="['text-sub-caption', item.color]"
            >
              {{ item.value }}
            </span>
          </span>
                          </div>
                          <!-- Divider (skip for last item) -->
                          <div
                            v-if="index !== stats.length - 1"
                            style="width: 1px; height: 24px; background-color: #ccc; margin: 0 12px;"
                          />
                        </div>
                      </template>
                    </div>
                  </VCardText>

                </VCard>

              </VExpansionPanelTitle>
              <VExpansionPanelText>
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
            </VExpansionPanel>
          </VExpansionPanels>
        </VWindowItem>
      </VWindow>
    </VCardText>
    </VCard>
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
</style>
