<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useBookingStore } from "../../stores/booking";

interface User {
  id: Number;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

const uid: Ref<any> = ref("");
// ログインユーザー情報
const loginUser: Ref<User | undefined> = ref();
// flight情報
const flight = ref();

// onMounted(()=>{
// 予約者情報取得
// ①ログインしているユーザーの場合
// authStore呼び出し
const authStore = useAuthStore();
// ログインしているか判断
const currentUser = computed(() => {
  return authStore.uid;
});
uid.value = currentUser;
// })
console.log(currentUser.value);
console.log(uid.value);

// ログイン認証して自分のidを指定する
const getUser = async () => {
  const response = await fetch(`http://localhost:3000/users/${uid.value}`);
  const data = await response.json();
  loginUser.value = data;
  console.log(data);
};
getUser();
// })

// ②ゲストの場合(guestsからさっき入力した情報を取得してくる。どうやってさっきの情報を判断するか、、)

// 搭乗者情報取得(passengerからさっき入力した情報を取得してくる。どうやってさっきの情報を判断するか、、)

// 予約内容取得
const bookingStore = useBookingStore();
const selectedFlightId = computed(() => {
  return (bookingStore as any).flight_id;
});
const selectedFlight = computed(() => {
  return (bookingStore as any).flight;
});
const selectedDate = computed(() => {
  return (bookingStore as any).date;
});
const selectedPassenger: ComputedRef<number> = computed(() => {
  return (bookingStore as any).passengerNum;
});
// 該当便の情報をflightsテーブルから取得する
const getFlight = async () => {
  const response = await fetch(
    `http://localhost:3000/flights/${selectedFlightId.value}`
  );
  const data = await response.json();
  flight.value = data;
};
getFlight();

// 合計金額計算する
const totalPrice = computed(() => {
  return Number(selectedPassenger.value) * 10000;
});

// 予約確定ボタン
const confirmed = async () => {
  //reservationsに追加する
  // もしかしたらゲストの場合と会員の場合で分けないといけないかも
  const response = await fetch("http://localhost:3000/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: currentUser.value || null,
      guest_id: null, //ゲストid取得できるようになったら追記する
      flight_id: selectedFlightId.value,
      flight_date: selectedDate.value,
      number_of_passenger: selectedPassenger.value,
      total_price: totalPrice,
      // appointment_date DateTime @default(now()) @db.Timestamp(0)
      payment_method_id: 1,
      payment_status_id: 1,
    }),
  });
  const data = await response.json();

  // 会員の場合users/ゲストの場合guestsテーブルのreservationsを更新する
  // passengersの該当搭乗者のreservationsカラムを更新する

  // Piniaリセット(bookingStore)

  // 予約完了画面に遷移
};
</script>

<template>
  <h1>最終確認</h1>
  <h2>予約者情報確認</h2>
  <!-- <p>{{ currentUser }}</p> -->
  <!-- <p>苗字：{{ loginUser.last_name }}</p> -->
  <!-- <p>名前：{{ loginUser.first_name }}</p> -->
  <!-- <p>電話番号：{{ loginUser.phone }}</p> -->

  <h2>搭乗者情報確認</h2>
  <p>搭乗者1：予約者と同じ</p>
  <p>搭乗者2：</p>

  <h2>予約内容確認</h2>
  <p>{{ selectedFlight }}便</p>
  <p>出発日：{{ selectedDate }}</p>
  <!-- <p>出発時間：{{ flight.departure_time }}</p> -->
  <!-- <p>到着時間：{{ flight.arrival_time }}</p> -->
  <p>人数：{{ selectedPassenger }}</p>
  <p>合計金額：{{ totalPrice }}</p>
</template>
