<template>
  <NuxtLayout name="app-layout">
    <AppNavbar class="navbar" />
    <AppSchedule class="schedule" />
    <AppFooter />
  </NuxtLayout>
</template>
<script>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import AppSchedule from './components/AppSchedule.vue'
export default {
  components: { AppSchedule, AppFooter, AppNavbar }
}
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
