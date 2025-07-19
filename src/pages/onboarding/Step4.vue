<script setup>

    import { useConfigStore } from '@core/stores/config'

import { ref, computed } from 'vue'
import Frame from '@/assets/images/Frame.svg?url'

const balance = ref(523.65)
const profitPercent = ref(50.15)
const activeTab = ref(0)
const search = ref('')
const page = ref(1)
    const store = useConfigStore()


    const features = [
        {
            feature: 'Software Service Fee (SSF)',
            starter: true,
            enterprise: true,
            pro:true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: '(Ex: 100 USDT/USDC closing trade | 0.4 USDT/USDC SSF)',
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Trade Bots**',
            starter: false,
            pro: false,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Connection',
            starter: false,
            pro: true,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Group Support',
            starter: false,
            pro: false,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: true,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Referral Rewards Program',
            starter: false,
            pro: true,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Membership App',
            starter: false,
            pro: false,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: true,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Maximum Diversification',
            starter: false,
            pro: false,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
        {
            feature: 'Savings',
            starter: false,
            pro: false,
            enterprise: true,
            vip:true,
            advanced: true,
            free:true,
            addOnAvailable: {
                starter: false,
                pro: false,
                enterprise: false,
                vip:true,
                advanced: true,
                free:true,
            },
        },
    ]
</script>

<template>
    <VRow>
        <Vcol class="v-col v-col-12">
            <VCard class="mb-4" title="Current Balance" style="max-width: 100%">
              <template #append>
                <VIcon icon="tabler-wallet" size="50" style="background-color: rgb(var(--v-global-theme-primary))"/>
              </template>
              <VCardText>
                <VRow align="center" justify="space-between">
                  <VCol>
                    <div class="usdt">USDT Tether</div>
                    <div class="d-flex align-center mt-2">
                      <img :src="Frame"> <span class="wallet-balance pl-2 pr-2">{{ balance }}</span>
                      <VIcon icon="tabler-s-turn-up" size="22"  style="background-color: green"/>
                      <span class="text-success" label>-{{ profitPercent }}%</span>
                    </div>
                  </VCol>

                </VRow>
              </VCardText>
            </VCard>

            <VCard style="max-width: 100%">
                <VCardText class="text-left " style="padding: 0px;">
                    <!-- 👉 Features & Tables -->
                    <VTable class="text-no-wrap border rounded pricing-table">
                        <!-- 👉 Table head -->
                        <thead>
                        <tr>
                            <th
                                    scope="col"
                                    class="py-4"
                            >
                                <div>
                                    Features
                                </div>
                                <div class="text-body-2">
                                    Native Font Features
                                </div>
                            </th>
                            <th
                                    v-for="{ plan, price } in [
                    { plan: 'Starter', price: '$100/Annually' },
                    { plan: 'Advanced', price: '$250/Annually' },
                    { plan: 'Pro', price: ' $550/Annually' },
                     { plan: 'VIP', price: '$995/Annually' },
                    { plan: 'VIP+', price: '$1450/Annually' },
                    { plan: 'Free', price: 'UNLIMITED ACCESS' }
                  ]"
                                    :key="plan"
                                    scope="col"
                                    class="text-center py-4"
                            >
                                <div class="position-relative">
                                    {{ plan }}
                                    <VAvatar
                                            v-if="plan === 'Pro'"
                                            size="20"
                                            class="ms-2 position-absolute"
                                            variant="elevated"
                                            color="primary"
                                            style="inset-block-end: 7px;"
                                    >
                                        <VIcon
                                                icon="tabler-star"
                                                size="14"
                                                color="white"
                                        />
                                    </VAvatar>
                                </div>
                                <div class="text-body-2">
                                    {{ price }}
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <!-- 👉 Table Body -->
                        <tbody>
                        <tr
                                v-for="feature in features"
                                :key="feature.feature"
                        >
                            <td class="text-start text-body-1 text-high-emphasis">
                                {{ feature.feature }}
                            </td>
                            <td class="text-center">
                                <VAvatar
                                        variant="tonal"
                                        size="20"
                                        :color="feature.starter ? 'primary' : 'secondary'"
                                >
                                    <VIcon
                                            v-if="!feature.addOnAvailable.starter"
                                            :color="feature.starter ? 'primary' : 'secondary'"
                                            size="14"
                                            :icon="feature.starter ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                                <VChip
                                        v-if="feature.addOnAvailable.starter"
                                        color="primary"
                                        size="small"
                                        label
                                >
                                    Add-On Available
                                </VChip>
                            </td>
                            <td class="text-center">
                                <VChip
                                        v-if="feature.addOnAvailable.pro"
                                        color="primary"
                                        size="small"
                                        label
                                >
                                    Add-On Available
                                </VChip>
                                <VAvatar
                                        v-else
                                        size="20"
                                        variant="tonal"
                                        :color="feature.pro ? 'primary' : 'secondary'"
                                >
                                    <VIcon
                                            :color="feature.pro ? 'primary' : 'secondary'"
                                            size="14"
                                            :icon="feature.pro ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                            </td>
                            <td class="text-center">
                                <VChip
                                        v-if="feature.addOnAvailable.enterprise"
                                        label
                                        color="primary"
                                        size="small"
                                >
                                    Add-On Available
                                </VChip>
                                <VAvatar
                                        v-else
                                        size="20"
                                        variant="tonal"
                                        :color="feature.enterprise ? 'primary' : 'disabled'"
                                >
                                    <VIcon
                                            :color="feature.enterprise ? 'primary' : 'disabled'"
                                            size="14"
                                            :icon="feature.enterprise ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                            </td>
                            <td class="text-center">
                                <VChip
                                        v-if="feature.addOnAvailable.enterprise"
                                        label
                                        color="primary"
                                        size="small"
                                >
                                    Add-On Available
                                </VChip>
                                <VAvatar
                                        v-else
                                        size="20"
                                        variant="tonal"
                                        :color="feature.enterprise ? 'primary' : 'disabled'"
                                >
                                    <VIcon
                                            :color="feature.enterprise ? 'primary' : 'disabled'"
                                            size="14"
                                            :icon="feature.enterprise ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                            </td>
                            <td class="text-center">
                                <VChip
                                        v-if="feature.addOnAvailable.enterprise"
                                        label
                                        color="primary"
                                        size="small"
                                >
                                    Add-On Available
                                </VChip>
                                <VAvatar
                                        v-else
                                        size="20"
                                        variant="tonal"
                                        :color="feature.enterprise ? 'primary' : 'disabled'"
                                >
                                    <VIcon
                                            :color="feature.enterprise ? 'primary' : 'disabled'"
                                            size="14"
                                            :icon="feature.enterprise ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                            </td>
                            <td class="text-center">
                                <VChip
                                        v-if="feature.addOnAvailable.enterprise"
                                        label
                                        color="primary"
                                        size="small"
                                >
                                    Add-On Available
                                </VChip>
                                <VAvatar
                                        v-else
                                        size="20"
                                        variant="tonal"
                                        :color="feature.enterprise ? 'primary' : 'disabled'"
                                >
                                    <VIcon
                                            :color="feature.enterprise ? 'primary' : 'disabled'"
                                            size="14"
                                            :icon="feature.enterprise ? 'tabler-check' : 'tabler-x'"
                                    />
                                </VAvatar>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 👉 Table footer -->
                        <tfoot>
                        <tr>
                            <td class="py-2" />
                            <td class="text-center py-2">
                                <VBtn
                                        variant="tonal"

                                >
                                    Choose Plan
                                </VBtn>
                            </td>
                            <td class="text-center py-2">
                                <VBtn >
                                    Current Plan
                                </VBtn>
                            </td>
                            <td class="text-center py-2">
                                <VBtn
                                        variant="tonal"

                                >
                                    Upgrade
                                </VBtn>
                            </td>
                            <td class="text-center py-2">
                                <VBtn
                                        variant="tonal"

                                >
                                    Upgrade
                                </VBtn>
                            </td>

                            <td class="text-center py-2">
                                <VBtn
                                        variant="tonal"

                                >
                                    Upgrade
                                </VBtn>
                            </td>

                            <td class="text-center py-2">
                                <VBtn
                                        variant="tonal"

                                >
                                    Upgrade
                                </VBtn>
                            </td>

                        </tr>
                        </tfoot>
                    </VTable>
                </VCardText>
            </VCard>

        </Vcol>
    </VRow>


</template>

<style lang="scss" scoped>
    .pricing-section {
        padding-block: 5.25rem !important;
        padding-inline: 0 !important;
    }

    .page-pricing-free-trial-banner-bg {
        /* stylelint-disable-next-line color-function-notation */
        background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));
        margin-block-start: 8.9375rem !important;
    }

    .pricing-card {
        padding-block-start: 10.5rem !important;
    }

    @media screen and (min-width: 960px) {
        .free-trial-illustrator {
            position: absolute;
            inset-block-end: -1rem !important;
            inset-inline-end: 0%;
        }
    }

    @media screen and (max-width: 959px) {
        .free-trial-illustrator {
            position: relative;
            inset-block-end: -1rem !important;
        }
    }

    .pricing-table {
        tr:nth-child(even) {
            background: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
        }
    }
</style>

<style lang="scss">
    .pricing-page {
        @media (min-width: 600px) and (max-width: 960px) {
            .v-container {
                padding-inline: 2rem !important;
            }
        }
    }
</style>
