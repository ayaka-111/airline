import { defineStore } from "pinia";

interface Users {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  phone: string;
}
interface Guests {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
  phone: string;
  reservation: Reservations[];
}
interface Passengers {
  id: string;
  reservation_id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
}
interface Flights {
  id: number;
  flight: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  reservations: Reservations[];
}
interface Payment {
  id: number;
  status: string;
}
interface Reservations {
  id: string;
  user_id?: string;
  users: Users;
  guest_id?: string;
  guests: Guests;
  flight_id: number;
  flight: Flights;
  flight_date: Date;
  number_of_passenger: number;
  total_price: number;
  appointment_date: Date;
  payment_method_id: number;
  payment_method: Payment;
  payment_status_id: number;
  payment_status: Payment;
  passengers: Passengers[];
}

export const useGuestReservationStore = defineStore({
  id: "guestReservation",
  state: () => ({
    reservationData: [] as Reservations[],
  }),
  actions: {
    async getReservationData(
      flight_date: string,
      first_name: string,
      last_name: string,
      email: string
    ) {
      const response = await fetch(
        `http://localhost:3000/guestReservations/?flight_date=${flight_date}&first_name=${first_name}&last_name=${last_name}&email=${email}`
      );
      const data = await response.json();
      this.reservationData = data;
    },
  },
  persist: true,
});
