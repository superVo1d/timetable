<template>
  <div class="form">
    <FocusTrap :initial-focus="() => $refs.nameInput.value.length === 0 && $refs.nameInput">
      <form @submit="handleSubmit($event)">
        <div class="form__fields">
          <button class="form__close" @click="close()" />
          <input
            ref="nameInput"
            v-model="name"
            autocomplete="name"
            name="name"
            placeholder="Имя"
            type="text"
            min="1"
            max="20"
          >
        </div>
        <button :disabled="!isValid" type="submit" class="form__submit">
          <span>
            <template v-if="isLoaderVisible">
              <AppLoader class="loader" />
            </template>
            <template v-else>
              Записаться
            </template>
          </span>
        </button>
      </form>
    </FocusTrap>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import { storeToRefs } from 'pinia'
import { useLocalStorage } from '../composables'
import { useTimetableStore } from '../store'

const { item: name } = useLocalStorage('name')
const isValid = ref(name.value.length > 0)

const timetable = useTimetableStore()

const { isSubmitting } = storeToRefs(timetable)

const isLoaderVisible = ref<boolean>(false)

watch(isSubmitting, () => {
  if (isSubmitting) {
    isLoaderVisible.value = true
  }
})

const emit = defineEmits(['submit', 'close'])

const handleSubmit = ($event: Event) => {
  $event.preventDefault()

  emit('submit', { name: name.value })
}

const close = () => {
  emit('close')
}

watch(name, () => {
  isValid.value = name.value.length > 0
})
</script>

<style scoped lang="scss">
  .form {
    @include font($font-body);

    background: var(--background-color);
    border-top: 0.1rem solid var(--main-color);
    bottom: 0;
    font-weight: 900;
    left: 0;
    position: absolute;
    width: 100%;

    &__fields {
      @include max-width();

      display: flex;
      flex-direction: column;
      padding: 1.2rem 1.2rem 3.5rem;

      input[type='text'] {
        border-bottom: 2px solid var(--main-color);
        height: 4.5rem;
        line-height: 4.5rem;

        &::placeholder {
          color: var(--main-color-20);
        }
      }
    }

    &__submit {
      @include font($font-h1);

      background: var(--main-color);
      color: #fff;
      padding: 3.5rem 0 4.8rem;
      transition: background-color 0.4s ease-in-out;
      width: 100%;

      > span {
        height: 4rem;
      }

      .loader {
        height: 4rem;
        position: relative;
        top: 0.4rem;
        width: 4rem;
      }

      &:disabled {
        background: var(--disabled-color);
      }

      &:focus {
        background: #fff;
        color: var(--main-color);
      }
    }

    &__close {
      align-self: flex-end;
      height: 3.6rem;
      position: relative;
      width: 3.6rem;

      &::after {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3ZTWrDMBCG4fcoXfQkLZTuK83CSc6eRc8QAk0hJWBDMTFxJM1oLPRBdsYzj34S2YGenp6e1vIKhIr1w9hDVl6AI/ALHLCPABfgOwczIa7jxxojI2Kqn4yJY/PXGWaHfnYLtW89FRkVi5kRrZqWGNGuZYExGzDNQuZLWBQK1tiHxQtXQ5RsoDqiRCNuEDkNuUOkNOYW8UyD7hFrGt0M4tFhr9bhMyv3Rn8zM7EWsylEMxBpYWkNLWx2aeHrNy40uv93jXtMXIFwj4lPINxiYgLCHSZkINxgQgFEdUxYKJzzm2COCQoIc0xQRJhhAvBjdMQQLczXAuJ2ptKKlMbcW06XnFf7BZ40h5SbfQBnw5mYZz4zJ+A99WYTxhoxx2QhpnxW/jN0AN4q1u/p6emhfP4AxlR3VfJGRpkAAAAASUVORK5CYII=) no-repeat center;
        background-size: contain;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 3.2rem;
      }

      &:focus {
       opacity: 0.2;
      }
    }
  }
</style>
