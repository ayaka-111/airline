<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useRouter } from "vue-router";

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

const router = useRouter();

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

// const detail = () => {
//   router.push({
//     path: "/reference",
//     query: {
//       flight: ,
//     },
//   });
// }
</script>

<template>
  <h1>マイページ</h1>
  <p>{{ uid }}</p>
  <div>
    <h2>予約一覧</h2>
    <div v-for="reservation in reservations" :key="reservation.id">
      <RouterLink
        v-bind:to="{ name: 'Reference', params: { id: reservation.id } }"
      >
        {{ reservation.flight.flight }}便
      </RouterLink>
      <p>予約日{{ new Date(reservation.appointment_date).toISOString() }}</p>
      <p>出発日{{ reservation.flight_date }}</p>

      <!-- <p>
              予約者名{{ reservation.users.first_name }}
              {{ reservation.users.last_name }}
            </p>
            <p>合計金額{{ reservation.total_price }}</p>
            <template
              v-for="passenger in reservation.passengers"
              :key="passenger.id">
              <p>
                搭乗者名{{ passenger.first_name }} {{ passenger.last_name }}
              </p>
            </template> -->
    </div>
  </div>
</template>

<style scoped>
/* モーダルウィンドウを開く要素 */
.modal_open_btn {
  cursor: pointer;
}
/* モーダルウィンドウ要素 */
.modal_contents {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  width: 100%;
}
/* モーダルウィンドウの背景要素 */
.modal_contents_bg {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
/* モーダルウィンドウの中身*/
.modal_contents_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  width: 25%;
  height: 30%;
  margin: auto;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.deleteBtn {
  height: 33%;
  color: red;
  font-weight: bold;
}
.deleteModal_contents_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin: auto;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.deleteModal_title {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.deleteText {
  color: gray;
}
.deleteModal_deleteBtn {
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  color: red;
  font-weight: bold;
  height: 25%;
}
.deleteModal_close_btn {
  cursor: pointer;
  height: 25%;
}
.updateBtn {
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  height: 33%;
}
/* モーダルウィンドウを閉じる要素 */
.modal_close_btn {
  cursor: pointer;
  height: 33%;
}
</style>
