import { defineStore } from 'pinia'
import { markRaw } from 'vue'

export type ModalAction = {
    callback: (props?: any) => void,
};

export type Modal = {
    isOpen: boolean,
    view: object,
    actions?: ModalAction,
};

export const useModalStore = defineStore('modal', {
  state: (): Modal => ({
    isOpen: false,
    view: {},
    actions: undefined
  }),
  actions: {
    open (view: object, actions?: ModalAction) {
      this.isOpen = true
      this.actions = actions
      this.view = markRaw(view)
    },
    close () {
      this.isOpen = false
      this.view = {}
      this.actions = undefined
    }
  }
})
