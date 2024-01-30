<template>
  <nav class="navbar">
    <div class="navbar__month">
      <div>
        {{ monthName }}
      </div>
    </div>
    <div class="navbar__dates">
      <button class="navbar__button prev" @click="changeWeek(-1)" />
      <div v-for="({ name, date, isToday }, index) in weekDays" :key="index" class="navbar-day" :class="{ today: isToday }">
        <div class="navbar-day__name">
          {{ name }}
        </div>
        <div class="navbar-day__date">
          {{ date }}
        </div>
      </div>
      <button class="navbar__button next" @click="changeWeek(1)" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'nuxt/app'
import { useTimetableStore } from '../store'
import { capitalize } from '../helpers'

const route = useRoute()
const router = useRouter()

const weekDifference = ref(route.query.week || 0)

const timetableStore = useTimetableStore()
const { incrementWeek } = timetableStore
const { currentDay, weekDates } = storeToRefs(timetableStore)

const changeWeek = (offset: number) => {
  weekDifference.value = (weekDifference.value ? parseInt(weekDifference.value as string) : 0) + offset
  router.push({ query: { ...route.query, week: weekDifference.value.toString() } })
  incrementWeek(offset)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const monthName = computed(() => {
  return capitalize(currentDay.value.toLocaleDateString('ru-RU', { month: 'long' }))
})

const weekDays = computed(() => {
  return weekDates.value.map((date) => {
    return {
      name: capitalize(date.toLocaleDateString('ru-RU', { weekday: 'short' })),
      date: date.getDate(),
      isToday: new Date().toDateString() === date.toDateString()
    }
  })
})
</script>

<style scoped lang="scss">
  .navbar {
    @include clearfix;

    background: var(--background-color);
    border-bottom: 1px solid var(--main-color);

    &__month {
      @include font($font-body);

      font-weight: 900;

      > div {
        @include max-width();

        padding: 2.6rem 2.2rem 1.2rem;
      }
    }

    &__dates {
      @include max-width();

      display: grid;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
      margin-bottom: 1.8rem;
    }

    &__button {
      position: relative;

      &::after {
        background-repeat: no-repeat;
        background-position: center;
        content: '';
        display: block;
        height: 3.2rem;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 3.2rem;
      }

      &.next::after {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZklEQVR4nO2WsQ2AMAwEbwBmyHS0SO5gWVbBNKZHisFE/Elu49NHlg1CiDwmCmnADmxVAjPgUVYlYcAREmVJmCQCJdGVhD9YyxAC2V9wNV9TX76Bmrti/9U6bnGQvD5qnznJhBiXE+Z0WgqwRWWwAAAAAElFTkSuQmCC);
      }

      &.prev::after {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZElEQVR4nO3WwQmAQAxE0V+AVVibVyE3LVcbcb1E2POCTpB5kOOSMAQ2YGZjJoQCOIFZ1bxlLcrmm5t/JRw7goVbu9jfqPoDPMt35YMdkfAQyUmUS6KpvuN+iEN1kJQ4ycz+5QZVrFoK00OXrwAAAABJRU5ErkJggg==);
      }

      &:focus {
        background: var(--background-color);
        color: #fff;
      }
    }
  }

  .navbar-day {
    padding: 1.2rem 0 0.8rem 0.8rem;

    &__name {
      @include font($font-caption);

      margin-bottom: 0.8rem;
    }

    &__date {
      @include font($font-h3);
    }

    &.today {
      background: var(--main-color);
      color: var(--background-color);
    }
  }
</style>
