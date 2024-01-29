<template>
  <div v-if="isOpen">
    <FocusTrap>
      <div class="modal">
        <component :is="view" v-model="model" class="modal-view" @close="modal.close()" @submit="actions?.callback(model)" />
      </div>
    </FocusTrap>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { FocusTrap } from 'focus-trap-vue'
import { useModalStore } from '../store'

const modal = useModalStore()

const model = reactive({})

const { isOpen, view, actions } = storeToRefs(modal)

watch(isOpen, () => {
  if (isOpen.value) {
    document.body.classList.add('modal')
  } else {
    document.body.classList.remove('modal')
  }
})
</script>

<style lang="scss" scoped>
  .modal {
    background: var(--main-color-20);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
  }
</style>
