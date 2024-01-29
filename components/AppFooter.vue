<template>
  <footer class="footer">
    <div>
      <div class="footer__year">
        © {{ year }} г.
      </div>
      <a class="footer__link" href="https://vk.com/newcyberrussia">«русский киберслон»</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => {
  return new Date().getFullYear()
})

</script>

<style scoped lang="scss">
  .footer {
    @include max-width();

    border: 1px solid black;
    border-bottom: unset;
    margin-top: -0.1rem;
    padding-top: 1.2rem;

    > div {
      border-top: 1px solid black;
      padding: 2.6rem 1.2rem;
    }

    &__year {
      @include font($font-caption);

      margin-bottom: 0.8rem;
    }

    &__link {
      @include font($font-h3);
    }
  }
</style>
