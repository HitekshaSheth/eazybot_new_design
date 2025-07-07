<script setup>
const themes = [
  {
    name: 'dark',
    icon: 'tabler-moon-stars',
  },
  {
    name: 'light',
    icon: 'tabler-sun-high',
  },
  {
    name: 'system',
    icon: 'tabler-device-desktop-analytics',
  },
]
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
