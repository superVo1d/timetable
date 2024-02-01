import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { IAddEventParams, IScheduleItem, ITimetableStoreState } from '../@types'

export const useTimetableStore = defineStore('timetable', {
  state: (): ITimetableStoreState => ({
    currentDay: new Date(), schedule: [], isSubmitting: false
  }),
  getters: {
    weekDates: (state) => {
      const date = new Date(state.currentDay.getTime())
      const firstDay = new Date(date.setDate(state.currentDay.getDate() - (date.getDay() + 6) % 7))

      const result = []

      for (let i = 0; i < 7; i++) {
        result.push(new Date(new Date(firstDay).setDate(firstDay.getDate() + i)))
      }

      return result
    }
  },
  actions: {
    incrementWeek (offset: number) {
      const date = new Date(this.currentDay.getTime())
      this.currentDay = new Date(date.setDate(date.getDate() + 7 * offset))

      this.fetchSchedule()
    },
    async fetchSchedule () {
      const data = await $fetch('/api', {
        query: {
          dt: `${this.currentDay.getFullYear()}-${this.currentDay.getMonth() + 1}-${this.currentDay.getDate()}`
        }
      })

      this.schedule = <IScheduleItem[]>data
    },
    async addEvent (params: IAddEventParams) {
      this.isSubmitting = true

      const data = await $fetch('/api', {
        method: 'POST',
        body: params
      })

      this.isSubmitting = false

      this.schedule.push(<IScheduleItem>data)
    }
  }
})
