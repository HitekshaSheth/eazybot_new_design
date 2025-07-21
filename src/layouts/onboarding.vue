<template>
    <VLayout class="onboarding-layout">
        <!-- Sidebar -->

        <!-- Main content -->
        <VMain class="bg-grey-lighten-5">
            <!-- Header -->
            <CustomHeader />

            <!-- Page content -->
            <RouterView />
        </VMain>
    </VLayout>
</template>

<script setup lang="ts">
    import CustomSidebar from '@/components/onboarding/Sidebar.vue'
    import CustomHeader from '@/components/onboarding/Header.vue'
</script>

<style scoped>
    .onboarding-layout {
        min-height: 100vh;
    }
</style>
