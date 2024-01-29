<template>
  <div class="layout">
    <AppModal />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppModal from '../components/AppModal.vue'
</script>

<style lang="scss" scoped>
.layout {
  /* .. */
}
</style>
