<template>
  <NuxtLayout name="app-layout">
    <AppNavbar class="navbar" />
    <AppSchedule class="schedule" />
    <AppFooter />
  </NuxtLayout>
</template>
<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import AppSchedule from './components/AppSchedule.vue'

useHead({
  title: 'Запись на тренировку',
  meta: [
    { name: 'msapplication-TileColor', content: '#ff7e0c' },
    { name: 'theme-color', content: '#ff7e0c' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff7e0c' }
  ]
})
</script>
<style lang="scss">
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .schedule {
    padding-top: 14.6rem;
  }
</style>
