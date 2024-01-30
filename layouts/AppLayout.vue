<template>
  <div class="layout">
    <AppModal />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute } from 'nuxt/app'
import AppModal from '../components/AppModal.vue'
import { useTimetableStore } from '../store'

const timetableStore = useTimetableStore()

const route = useRoute()

if (!process.client) {
  await timetableStore.incrementWeek(parseInt((route.query.week || 0).toString()))
  await useAsyncData('schedule', () => timetableStore.fetchSchedule())
}

</script>

<style lang="scss" scoped>
.layout {
  /* .. */
}
</style>
