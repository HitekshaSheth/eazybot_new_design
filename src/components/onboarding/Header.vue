<template>
    <VAppBar app flat color="white" elevation="1">
        <VToolbar flat >
            <div v-html="logo" style="height: 50px;" class="mb-lg-10 pt-lg-5 pl-lg-5"  md="2" />


        </VToolbar>
        <VSpacer/>
        <VBtn icon>
            <VIcon icon="mdi-bell-outline"/>
        </VBtn>
        <VAvatar image="/img/user.png" size="36" class="ms-4"/>
    </VAppBar>
</template>
<script setup>
    import logo from '@images/logo.svg?raw'
</script>