<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "../../stores/booking";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();

// authStore呼び出し
const authStore = useAuthStore();
// ログインしているか判断
const user = computed(() => {
  return authStore.currentUser;
});

// reservationStore呼び出し
const bookingStore = useBookingStore();
// 保存されている情報
const selectedFlight = computed(() => {
  return (bookingStore as any).flight;
});
const selectedDate = computed(() => {
  return (bookingStore as any).date;
});
const selectedPassenger = computed(() => {
  return (bookingStore as any).passengerNum;
});

const signInBtn = () => {
  router.push("/signIn");
};
const signUpBtn = () => {
  router.push("/signUp");
};
const guestBtn = () => {
  router.push("/guest");
};
// ログイン済みの場合は搭乗者入力画面へ遷移
const nextBtn = () => {
  router.push("/passenger");
};
</script>

<template>
  <h1>確認画面</h1>
  <div>便名{{ selectedFlight.flight }}</div>
  <div>日付{{ selectedDate }}</div>
  <div>人数{{ selectedPassenger }}</div>
  <div v-if="user === null">
    <v-btn @click="signInBtn">会員の方</v-btn>
    <v-btn @click="signUpBtn">新規会員登録</v-btn>
    <v-btn @click="guestBtn">会員登録せずに予約する</v-btn>
  </div>
  <div v-else>
    <v-btn @click="nextBtn">次へ</v-btn>
  </div>
</template>
