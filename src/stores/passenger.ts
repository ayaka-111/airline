import { defineStore } from "pinia";

interface Passengers {
  id: string;
  reservation_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
}
interface InputPassengerData{
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
}

export const usePassengerStore = defineStore({
  id: "passenger",
  state: () => ({
    // id: "",
    passenger: [] as InputPassengerData[],
  }),
  actions: {
    // getId(id: any) {
    //   this.id = id;
    // },
    async getPassenger(data:InputPassengerData[]) {
      // const response = await fetch(`http://localhost:3000/passengers/${id}`);
      // const data = await response.json();
      this.passenger = data;

    },
  },
  persist: true,
});
