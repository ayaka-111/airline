import { defineStore } from "pinia";

interface Guest {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

export const useGuestStore = defineStore({
  id: "guest",
  state: () => ({
    guestData: [] as Guest[],
  }),
  actions: {
    async getGuestData(id: string) {
      const response = await fetch(`http://localhost:3000/guests/${id}`);
      const data = await response.json();
      this.guestData = data;
    },
  },
  persist: true,
});
