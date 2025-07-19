<template>
<VContainer col="12" class="col-md-12">
    <VCardText>
        <div class="d-flex justify-center  align-start pb-0 px-3 pt-3 mb-4 bg-light-primary rounded">
            <VImg
                    :src="tradeimage"
                    width="145"
                    height="250"
            />
        </div>
        <div>
            <h5 class="text-h5 mb-2">
                You're all set!
            </h5>
            <div class="text-xxl-body-1">
                Your exchange is connected and the bot is ready to start trading automatically. 🚀 
                <VSpacer></VSpacer>Keep an eye on its performance and fine-tune your strategies to unlock even better returns.

            </div>
            &nbsp;
            <h5 class="text-h5 mb-2">
                The markets are yours—let’s make some gains!
            </h5>
        </div>
    </VCardText>
</VContainer>
</template>
<script setup>
    import tradeimage from '@images/auth/starttrade.png?url'

</script>