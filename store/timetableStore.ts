import { defineStore } from 'pinia'

export const useTimetableStore = defineStore('timetable', {
  state: () => ({ currentDay: new Date() }),
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
    }
  }
})
