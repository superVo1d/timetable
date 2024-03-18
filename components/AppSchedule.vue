<template>
  <div>
    <div v-for="({ name, date, intervals }, index) in days" :key="date" :ref="(el) => (daysRef[index] = el)" class="schedule-item">
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
          v-for="({ time, date, eventId, my }, intervalIndex) in intervals"
          :key="intervalIndex"
          class="schedule-item__time"
          :class="{active: date === activeDate, occupied: eventId, my }"
          tabindex="0"
          @click="!eventId && handleOnClickTime(date)"
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
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useModalStore, useTimetableStore } from '../store'
import { capitalize } from '../helpers'
import { useLocalStorage } from '../composables'
import { type IAddEventParams } from '../types'
import AppForm from './AppForm.vue'

const timetableStore = useTimetableStore()
const { weekDates, schedule } = storeToRefs(timetableStore)

const { item: events } = useLocalStorage('events')

interface EventInterface {
  time: string;
  date: Date;
  eventId?: string;
  name?: string;
  my: boolean;
}

interface DayInterface {
  name: string;
  date: string;
  dateRaw: Date;
  intervals: EventInterface[];
}

const days = ref<DayInterface[]>([])

const daysRef = ref<{ [name: string]: Element }>({})

const modal = useModalStore()

const activeDate = ref<Date | null>()

const handleOnClickTime = (date: Date) => {
  activeDate.value = date

  modal.open(AppForm,
    {
      callback: (data) => {
        const event: IAddEventParams = {
          name: data.name.toString(),
          date: (activeDate.value as Date).toISOString()
        }

        events.value = JSON.stringify([...JSON.parse(events.value || '[]'), event])

        timetableStore.addEvent(event).then(() => {
          modal.close()
          activeDate.value = null
        })
      }
    }
  )
}

const getDays: () => DayInterface[] = () => {
  return weekDates.value.map(date => ({
    name: capitalize(date.toLocaleDateString('ru-RU', { weekday: 'long' })),
    date: date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
    }),
    dateRaw: date,
    intervals: _.range(7, 23).map((hours: number) => {
      const interval = new Date(date)
      interval.setHours(hours, 0, 0, 0)
      const intervalEnd = new Date(interval)
      intervalEnd.setHours(interval.getHours() + 1)

      const eventAtDate = schedule.value.filter(({ date, dateEnd }) => {
        const startTime = new Date(date).getTime()
        const endTime = new Date(dateEnd).getTime()

        return startTime < intervalEnd.getTime() && endTime > interval.getTime()
      })[0]

      const my = JSON.parse(events.value || '[]').some((event: IAddEventParams) =>
        new Date(event.date).getTime() === new Date(interval).getTime()
      )

      return {
        time: interval.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: '2-digit' }),
        date: interval,
        eventId: eventAtDate?.id,
        name: eventAtDate?.name,
        my
      }
    })
  }))
}

if (process.server) {
  days.value = getDays()
}

onMounted(() => {
  days.value = getDays()

  days.value.forEach((day, index) => {
    if (new Date(new Date().setHours(0, 0, 0, 0)).getTime() === new Date(day.dateRaw.setHours(0, 0, 0, 0)).getTime()) {
      daysRef.value[index].scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  })
})
</script>

<style scoped lang="scss">
  .schedule-item {
    $selector: &;

    @include max-width();

    border-left: 0.1rem solid var(--main-color);
    border-right: 0.1rem solid var(--main-color);
    scroll-margin-top: 132px;

    @media (max-width: 400px) {
      border-left: unset;
      border-right: unset;
    }

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
      margin-top: -1.4rem;

      #{$selector}__header {
        border-top: 0;
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

      @media (max-width: 400px) {
        font-size: 7.5vw;
      }

      &.occupied {
        background: var(--main-color);
        cursor: default;
        color: #fff;
        pointer-events: none;
      }

      &.my,
      &:focus,
      &.active {
        background: #fff;
        color: var(--main-color);
      }
    }
  }
</style>
