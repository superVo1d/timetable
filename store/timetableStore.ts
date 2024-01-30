import { defineStore } from 'pinia'
import { IAddEventParams, IScheduleItem, ITimetableStoreState } from '../@types'

export const useTimetableStore = defineStore('timetable', {
  state: (): ITimetableStoreState => ({
    currentDay: new Date(), schedule: [], isSubmitting: false
  }),
  getters: {
    weekDates: (state) => {
      const firstDay = new Date(state.currentDay.setDate(state.currentDay.getDate() - (state.currentDay.getDay() + 6) % 7))

      const result = []

      for (let i = 0; i < 7; i++) {
        result.push(new Date(new Date(firstDay).setDate(firstDay.getDate() + i)))
      }

      return result
    }
  },
  actions: {
    incrementWeek (offset: number) {
      this.currentDay = new Date(this.currentDay.setDate(this.currentDay.getDate() + 7 * offset))

      this.fetchSchedule()
    },
    async fetchSchedule () {
      const data = await $fetch('http://0.0.0.0:8000', {
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
