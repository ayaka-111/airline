import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id:"auth",
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    setUser(user:any) {
      this.user = user;
    },
    clearUser(){
      this.user = null;
    },
  },
});
