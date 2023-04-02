<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useBookingStore } from "../../stores/booking";
import { useRouter } from "vue-router";
import { usePassengerStore } from "../../stores/passenger";
import { useGuestStore } from "../../stores/guest";

interface User {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

// ログインユーザー情報
const loginUser: Ref<User | undefined> = ref();
const loginUserUid: Ref<any> = ref("");
// flight情報
const flight = ref();
// const chooseFlightId = ref();
const chooseDate = ref();
const choosePassengerNum = ref();
// 搭乗者情報→配列にした方がいい？
const passenger = ref();
// const passenger_id = ref();

const router = useRouter();

// onMounted(() => {
// 予約者情報取得
// ①ログインしているユーザーの場合
// authStore呼び出し
const authStore = useAuthStore();

// uid取得
const uid = computed(() => {
  return authStore.uid;
});
// loginUserUid.value = uid;
// console.log(uid.value);
// ログインしているか判断
const currentUser = computed(() => {
  return authStore.currentUser;
});

// 自分のidを指定して情報取得
const loginUserData: any = computed(() => {
  return authStore.userData;
});
console.log(loginUserData.value);
// const getUser = async () => {
//   const response = await fetch(`http://localhost:3000/users/${uid.value}`);
//   const data = await response.json();
//   loginUser.value = data;
//   console.log(data);
// };
// getUser();
// })

// ②ゲストの場合
// guest情報pinia呼び出し
const guestStore = useGuestStore();
const guestData = computed(() => {
  return (guestStore as any).guestData;
});
console.log(guestData.value)

// 搭乗者情報取得
const passengerStore = usePassengerStore();
// const passengerId = computed(() => {
//   return (passengerStore as any).id;
// });
// console.log(passengerId.value);
// (passengerStore as any).getPassenger(passengerId.value);
const passengerData = computed(() => {
  return (passengerStore as any).passenger;
});

console.log(passengerData.value);

// console.log(passengerId.value);
// const getPassenger = async () => {
//   const response = await fetch(
//     `http://localhost:3000/passengers/${passengerId.value}`
//   );
//   const data = await response.json();
//   passenger.value = data;
//   console.log(data);
// };
// getPassenger();

// })  //onMount

// 予約内容取得
const bookingStore = useBookingStore();
// const selectedFlightId = computed(() => {
//   return (bookingStore as any).flight_id;
// });

// 該当便の情報をflightsテーブルから取得する
const flightData = computed(() => {
  return (bookingStore as any).flight;
});
// const getFlight = async () => {
//   const response = await fetch(
//     `http://localhost:3000/flights/${selectedFlightId.value}`
//   );
//   const data = await response.json();
//   flight.value = data;
//   console.log(data)
// };
// getFlight();
// console.log(flight.value)

// const selectedFlight = computed(() => {
//   return (bookingStore as any).flight;
// });

const selectedDate = computed(() => {
  return (bookingStore as any).date;
});
// chooseDate.value = selectedDate.value;

const selectedPassenger: ComputedRef<number> = computed(() => {
  return (bookingStore as any).passengerNum;
});
// choosePassengerNum.value = selectedPassenger.value;



// }); //onBeforeMount

// 合計金額計算する
const totalPrice = computed(() => {
  return Number(selectedPassenger.value) * 10000;
});

// const nowDate = new Date();
// console.log(nowDate.toString())
// console.log(nowDate)

// 予約確定ボタン
const confirmed = async () => {
  const nowDate = new Date().toLocaleString("ja-JP", {timeZone: "Europe/London"})
  console.log(new Date(nowDate).toString())

  if (currentUser.value !== null) {
    console.log("会員")
    // 会員の場合
    //reservationsに追加する
    const response = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: uid.value,
        flight_id: flightData.value.id,
        flight_date: selectedDate.value,
        number_of_passenger: Number(selectedPassenger.value),
        total_price: totalPrice.value,
        appointment_date: new Date(nowDate).toISOString(),
        payment_method_id: 1,
        payment_status_id: 1,
        passengers: passengerData.value.id,
      }),
    });
    const reservationData = await response.json();
    console.log(reservationData);

    // usersテーブルのreservationsを更新する→reservationsテーブルのuser_idで既に紐付けされてる
      // const updateUser = await fetch(
      //   `http://localhost:3000/users${uid.value}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       reservations: reservationData.id,
      //     }),
      //   }
      // );
      // const updateUserData = await updateUser.json();


    const updatePassenger = await fetch("http://localhost:3000/passengers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: passengerData.value.first_name,
        last_name: passengerData.value.last_name,
        date_of_birth: new Date(passengerData.value.date_of_birth),
        gender: passengerData.value.gender,
        reservation_id: reservationData.id,
      }),
    });
    const updatePassengerData = await updatePassenger.json();
    console.log(updatePassengerData);
  } else {
    console.log("ゲスト")
    const guestResponse = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_id: guestData.value.id,
        flight_id: flightData.value.id,
        flight_date: selectedDate.value,
        number_of_passenger: Number(selectedPassenger.value),
        total_price: totalPrice.value,
        appointment_date: new Date(nowDate).toISOString(),
        payment_method_id: 1,
        payment_status_id: 1,
        passengers: passengerData.value.id,
      }),
    });
    const guestReservationData = await guestResponse.json();
    console.log(guestReservationData);


    // passenger更新
    const updateGuestPassenger = await fetch("http://localhost:3000/passengers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: passengerData.value.first_name,
        last_name: passengerData.value.last_name,
        date_of_birth: new Date(passengerData.value.date_of_birth),
        gender: passengerData.value.gender,
        reservation_id: guestReservationData.id,
      }),
    });
    const updateGuestPassengerData = await updateGuestPassenger.json();
    console.log(updateGuestPassengerData);
  }

  // Piniaリセット(bookingStore,passengerStore)
  bookingStore.$reset();
  passengerStore.$reset();
  guestStore.$reset();

  // 予約完了画面に遷移
  router.push("/completed")
}; //confirmedボタン
</script>

<template>
  <h1>最終確認</h1>
  <h2>予約者情報確認</h2>
  <div v-if="currentUser !== null">
  <p>苗字：{{ loginUserData.last_name }}</p>
  <p>名前：{{ loginUserData.first_name }}</p>
  <p>電話番号：{{ loginUserData.phone }}</p>
  </div>
  <div v-else>
  <p>苗字：{{ guestData.last_name }}</p>
  <p>名前：{{ guestData.first_name }}</p>
  <p>電話番号：{{ guestData.phone }}</p>
  </div>

  <h2>搭乗者情報確認</h2>
  <h3>搭乗者1</h3>
  <p>名前：{{ passengerData.first_name }}　{{ passengerData.last_name }}</p>
  <p>生年月日:{{ passengerData.date_of_birth }}</p>
  <p>性別：{{ passengerData.gender }}</p>
  <h3>搭乗者2</h3>

  <h2>予約内容確認</h2>
  <p>{{ flightData.flight }}便</p>
  <p>出発日：{{ selectedDate }}</p>
  <p>出発時間：{{ flightData.departure_time }}</p>
  <p>到着時間：{{ flightData.arrival_time }}</p>
  <p>人数：{{ selectedPassenger }}</p>
  <p>合計金額：{{ totalPrice }}</p>
  <v-btn @click="confirmed">予約確定</v-btn>
</template>
