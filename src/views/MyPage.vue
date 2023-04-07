<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useRouter } from "vue-router";
import TimeStamp from "../components/atoms/TimeStamp.vue";

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

const loading = ref(true);

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    const response = await fetch(
      `http://localhost:3000/myReservations/?user_id=${currentUser.uid}`
    );
    const data = await response.json();
    console.log(data);
    reservations.value = data;
    loading.value = false;
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
  <template v-if="loading">
    <v-card height="190" class="text-center">
      <v-progress-circular
        :size="100"
        indeterminate
        color="#3498db"
        class="mt-4"
        >Loading...
      </v-progress-circular>
    </v-card>
  </template>
  <template v-else>
    <div class="wrapper">
      <div class="text-h5 text-center">MyPage</div>
      <div>
        <div class="text-h6 mt-5">予約履歴</div>
        <div v-for="reservation in reservations" :key="reservation.id">
          <RouterLink
            v-bind:to="{ name: 'Reference', params: { id: reservation.id } }"
            class="h-100"
          >
            <div class="reservationWrapper d-flex">
              {{ reservation.flight.flight }}便
              <div class="d-flex dateContents">
                <div>
                  <p class="text-subtitle-2">ご予約日</p>
                  <TimeStamp :date="reservation.appointment_date" />
                </div>
                <div>
                  <p class="text-subtitle-2">出発日</p>
                  <TimeStamp :date="reservation.flight_date" />
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
}
.reservationWrapper {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 3%;
  gap: 15%;
}
.reservationWrapper:hover {
  background-color: #f0f8ff;
}
.dateContents {
  gap: 65%;
}
</style>
