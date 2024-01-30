<template>
  <transition name="fade" appear>
    <div v-if="isOpen" class="modal-overlay" />
  </transition>
  <transition name="slide-in" appear>
    <div v-if="isOpen" class="modal">
      <FocusTrap>
        <component :is="view" v-model="model" class="modal-view" @close="modal.close()" @submit="actions?.callback(model)" />
      </FocusTrap>
    </div>
  </transition>
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
  .modal,
  .modal-overlay {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  .modal-overlay {
    background: var(--main-color-20);
    z-index: 2;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s linear;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: transform 0.4s ease-in-out;
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translate3d(0, 100%, 0);
  }
</style>
