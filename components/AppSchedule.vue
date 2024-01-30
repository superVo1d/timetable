<template>
  <div>
    <div v-for="({ name, date, intervals }, index) in days" :key="index" class="schedule-item">
      <div class="schedule-item__header">
        <div>
          <div class="schedule-item__name">
            {{ name }}
          </div>
          <div class="schedule-item__date">
            {{ date }}
          </div>
        </div>
      </div>
      <div class="schedule-item__body">
        <div
          v-for="({ time, date }, intervalIndex) in intervals"
          :key="intervalIndex"
          class="schedule-item__time"
          :class="{active: date === activeDate}"
          tabindex="0"
          @click="handleOnClickTime(date)"
        >
          <div>
            {{ time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useModalStore, useTimetableStore } from '../store'
import { capitalize } from '../helpers'
import AppForm from './AppForm.vue'

const timetableStore = useTimetableStore()
const { weekDates } = storeToRefs(timetableStore)

const modal = useModalStore()

const activeDate = ref()

const handleOnClickTime = (date: Date) => {
  activeDate.value = date

  modal.open(AppForm,
    {
      callback: (data) => {
        console.log(data, activeDate.value)
        modal.close()
      }
    }
  )
}

const days = computed(() => {
  return weekDates.value.map(date => ({
    name: capitalize(date.toLocaleDateString('ru-RU', { weekday: 'long' })),
    date: date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
    }),
    intervals: _.range(7, 23).map((hours: number) => {
      const interval = new Date(date.setHours(hours, 0, 0))

      return {
        time: interval.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: '2-digit' }),
        date: interval
      }
    })
  }))
})
</script>

<style scoped lang="scss">
  .schedule-item {
    $selector: &;

    @include max-width();

    border-left: 0.1rem solid var(--main-color);
    border-right: 0.1rem solid var(--main-color);

    &__header {
      @include font($font-body);

      background: var(--background-color);
      border-bottom: 0.1rem solid var(--main-color);
      border-top: 0.1rem solid var(--main-color);
      margin-top: -1px;
      padding: 1.2rem 0 0;
      position: sticky;
      top: 13.2rem;

      > div {
        border-top: 0.1rem solid var(--main-color);
        padding: 1.2rem 2.4rem;
      }
    }

    &:first-child {
      #{$selector}__header {
        border-top: unset;
        padding-top: 0;
        top: 14.6rem;

        > div {
          border-top: unset;
        }
      }
    }

    &__name {
      margin-bottom: 0.4rem;
    }

    &__date {
      font-weight: 900;
    }

    &__body {
      @include font($font-h2);

      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    &__time {
      border-bottom: 0.1rem solid var(--main-color);
      border-right: 0.1rem solid var(--main-color);
      cursor: pointer;
      padding: 1.8rem 0 1.2rem 1.2rem;

      &:nth-child(3n + 3) {
        border-right: none;
      }

      &:focus {
        background: #fff;
        color: var(--main-color);
      }

      &.active {
        background: var(--main-color);
        color: #fff;
      }
    }
  }
</style>
