import { defineStore } from "pinia";
// interface selectedFlight {
//   flight_id: string;
//   date: string;
//   passengerNum: number;
// }
interface Flights {
  id: number,
  flight: string,
  from: string,
  to: string,
  departure_time: string,
  arrival_time: String,
  price: number,
}
// export const useBookingStore = defineStore({
//   id: "booking",
//   state: () => ({
//     // flight: null as selectedFlight | null | any,
//     flightNo: "",
//     date: "",
//     passengerNum: 0,
//   }),
//   // getters: {
//   //   isSelected: (state) => state.flight,
//   // },
//   actions: {
//     selectedFlight(data: any) {
//       this.flightNo = data;
//     },
//     selectedDate(a:any){
//       this.date = a;
//     },
//     selectedPassengerNum(b:any){
//       this.passengerNum = b;
//     },
//   },
//   persist: true,
// });

export const useBookingStore = defineStore({
  id:"booking",
  state: () => ({
    // flight_id: 0,
    // flight: "",
    flight: [] as Flights[],
    date: "",
    passengerNum: 0,
  }),
  // getters: { //ログインしているかどうか判断
  //   // isLoggedIn: (state) => state.currentUser !== null,
  //   isLoggedIn: (state) => state.currentUser,
  //   // getUid: uid
  // },
  actions: {
    // selectedFlightId(id:number){
    //   this.flight_id = id
    // },
    // selectedFlight(flight:string) {
    //   this.flight = flight;
    // },
    selectedDate(date:any){
      this.date = date;
    },
    selectedPassengerNum(num:number){
      this.passengerNum = num;
    },
    async getFlight(id:number) {
      const response = await fetch(
        `http://localhost:3000/flights/${id}`
      );
      const data = await response.json();
      this.flight = data;
    }
  },
  persist: true,
});
