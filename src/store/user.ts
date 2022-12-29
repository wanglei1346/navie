import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "123",
    roleIds: [],
  }),
  actions: {
    LoginIn(token: string) {
      this.token = token
      localStorage.setItem("token", token)
    },
    LoginOut() {
      localStorage.removeItem("token")
      location.href = "/"
    },
  },
})
