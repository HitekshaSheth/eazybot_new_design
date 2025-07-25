<template>
    <v-dialog
            v-model="isOpen"
            persistent
            max-width="500"
            transition="dialog-top-transition"
    >
        <DialogCloseBtn @click="isOpen = !isOpen" />

        <v-card class="text-center">
            <v-card-text class="body-1">
                <div class="d-flex justify-center mb-4" >
                    <span class="tabler-loader-2 text-primary" role="status" style="width: 3rem; height: 3rem"></span>
                </div>

                <v-card-title class="justify-center text-primary font-weight-bold ">
                    <h3 class="  text-h3 font-weight-bold text-primary">Payment Processing</h3>
                </v-card-title>
                Payment is processing. Funds will appear in your wallet once approved. Please wait while we confirm your transaction.
                <div class="mt-3 text--secondary">To add funds again? click Add Fund</div>
            </v-card-text>
            <v-card-actions class="justify-space-between">
                <!--<v-btn text @click="close">Back</v-btn>-->
                <VBtn variant="elevated" block >
                    Add Fund
                </VBtn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps({ modelValue: Boolean })
    const emit = defineEmits(['update:modelValue'])

    const isOpen = ref(props.modelValue)

    watch(() => props.modelValue, val => isOpen.value = val)
    watch(isOpen, val => { if (!val) emit('update:modelValue', false) })

    function close() {
        isOpen.value = false
    }
    function onAddFund() {
        // redirect or navigate to add fund view
        emit('update:modelValue', false)
        // e.g., router push or emit event
    }
</script>
