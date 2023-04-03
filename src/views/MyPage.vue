<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/index";

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
  payment_status_id: number;
  passengers: Passengers[];
}

// const user: Ref<User | undefined> = ref();
const reservations: Ref<Reservations[]> = ref([]);

const authStore = useAuthStore();

const uid = computed(() => {
  return authStore.uid;
});

// const user = computed(() => {
//   return authStore.userData;
// });
// console.log(user.value);

// ログイン認証して自分のidを指定する
// const getUser = async () => {
//   const response = await fetch(
//     `http://localhost:3000/users/${currentUser.value}`
//   );
//   const data = await response.json();
//   user.value = data;
// };

// getUser();

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    const response = await fetch(
      `http://localhost:3000/myReservations/?user_id=${currentUser.uid}`
    );
    const data = await response.json();
    console.log(data);
    reservations.value = data;
  } else {
    console.log("ログアウト状態");
  }
});

// usersのreservationsのidをmapで回してreservationsのデータを取得する
// const getReservation = () => {
//   user.value.reservations.map((id:string) => {
//     const response = fetch(`http://localhost:3000/reservations/${id}`)
//     .then(()=> {
//       const data = response.json();
//     })
//   });
// };
// getReservation();
</script>

<template>
  <h1>マイページ</h1>
  <p>{{ uid }}</p>
  <div>
    <h2>予約一覧</h2>
    <div v-for="reservation in reservations" :key="reservation.id">
      <p>予約日{{ reservation.appointment_date }}</p>
      <p>出発日{{ reservation.flight_date }}</p>
      <p>{{ reservation.flight.flight }}便</p>
      <p>
        予約者名{{ reservation.users.first_name }}
        {{ reservation.users.last_name }}
      </p>
      <template v-for="passenger in reservation.passengers" :key="passenger.id">
        <p>搭乗者名{{ passenger.first_name }} {{ passenger.last_name }}</p>
      </template>
      <hr />
    </div>
  </div>
</template>
