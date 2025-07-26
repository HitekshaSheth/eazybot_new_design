<template>
    <v-dialog
            v-model="isOpen"
            max-width="500"
            persistent
            transition="dialog-right-transition"
    >
        <DialogCloseBtn @click="isOpen = !isOpen" />

        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>Deposit Amount</v-toolbar-title>
                <v-spacer/>
                <!--<VBtn class="text-primary mr-3"icon @click="isOpen = false">-->
                    <!--<VIcon icon="tabler-square-rounded-x" />-->
                <!--</VBtn>-->
            </v-toolbar>
            <v-card-text class="text-center">
                <!-- Example UI content -->
                <h3 class="display-2  text-h3 font-weight-bold text-primary">{{ amount }}</h3>
                <div class="subtitle-1">USDT.TR C20</div>
                <!-- QR code or other content goes here -->
                <div class="d-flex justify-center  align-start pb-0 px-3 pt-3 mb-4 ">
                    <VImg
                            :src="payment"
                            width="145"
                            height="250"
                    />
                </div>
                <p class="text-sm text-error">*Address valid for 24 hours</p>
                <p class="text-sm">
                    Warning/Caution: This is a one-time wallet address that will expire. Do not re-deposit a second time to this temporary wallet address as you may lose your funds.

                </p>
                <AppTextField
                        v-model="walletAddress"
                        type="text"
                        append-inner-icon="tabler-copy"
                />

            </v-card-text>
            <v-card-actions>
                <VBtn variant="elevated" block  @click="onPaid">
                    I Did the Payment
                </VBtn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <PaymentProcessingDialog v-model="processingDialog" />

</template>

<script setup>
    import { computed } from 'vue'
    import { defineProps, defineEmits, ref } from 'vue'
    import PaymentProcessingDialog from '@/layouts/components/PaymentProcessingDialog.vue'
    import payment from '@images/auth/payment-scanner.png?url'

    const processingDialog = ref(false)

    const props = defineProps({
        modelValue: Boolean
    })
    const emit = defineEmits(['update:modelValue'])

    const isOpen = ref(props.modelValue)

    watch(
        () => props.modelValue,
        val => { isOpen.value = val }
    )
    watch(isOpen, val => {
        if (!val) emit('update:modelValue', false)
    })

    const amount = computed(() => 103.22)
    const walletAddress = ref('TLcK1jxtV3LW51kugYXPUWgzXkkJfnnAyD')

    function onPaid() {
      isOpen.value = false
        // After confirming payment, open the processing modal
        processingDialog.value = true
        // simulate backend confirmation delay
        setTimeout(() => {
            // close dialog or navigate
            processingDialog.value = false
        }, 25000)
    }
</script>
