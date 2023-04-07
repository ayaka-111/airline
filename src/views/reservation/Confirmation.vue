<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "../../stores/booking";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import TimeStamp from "../../components/atoms/TimeStamp.vue";

const router = useRouter();

// authStore呼び出し
const authStore = useAuthStore();
// ログインしているか判断
const user = computed(() => {
  return authStore.currentUser;
});

// bookingStore呼び出し
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

const totalPrice = computed(() => {
  return Number(selectedPassenger.value) * 10000;
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
  <div class="wrapper">
    <h1>沖縄へのご旅行</h1>
    <div class="d-flex justify-space-between mt-4 item-flight-Wrapper">
      <div class="imgWrapper">
        <v-img src="okinawa2.jpg" aspect-ratio="9/16" cover class="img"></v-img>
      </div>
      <div class="flightContents d-flex justify-space-around align-center">
        <div>
          <div class="font-weight-bold">
            {{ selectedFlight.departure_time }}-{{
              selectedFlight.arrival_time
            }}
          </div>
          <div>
            <div class="d-flex align-sm-center mt-2 mx-2 toFromText">
              <v-icon
                icon="mdi-circle-outline"
                color="#3498db"
                size="x-small"
              ></v-icon>
              <p class="font-weight-bold text-subtitle-1">
                {{ selectedFlight.from }}
              </p>
            </div>
            <v-icon
              icon="mdi-dots-vertical"
              color="#3498db"
              size="large"
              class="dotLine"
            ></v-icon>
            <div class="d-flex align-sm-center mx-2 toFromText">
              <v-icon
                icon="mdi-circle-outline"
                color="#3498db"
                size="x-small"
              ></v-icon>
              <p class="font-weight-bold text-subtitle-1">
                {{ selectedFlight.to }}
              </p>
            </div>
          </div>
          <!-- to,dot,from-->
        </div>
        <!--時間と行き先-->
        <div>
          <div class="font-weight-bold">
            <!-- {{ selectedDate }} -->
            <TimeStamp :date="selectedDate" />
          </div>
          <div class="mt-7">{{ selectedFlight.flight }}</div>
        </div>
        <div>
          <div class="text-right">{{ selectedPassenger }}名様</div>
          <div class="font-weight-bold text-h6">
            ¥{{ totalPrice.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="user === null" class="mt-10 text-right">
      <v-btn @click="signInBtn" class="btn"><span class="btnText">会員の方</span></v-btn>
      <v-btn @click="signUpBtn" class="btn mx-6"
        ><span class="btnText">新規会員登録</span></v-btn
      >
      <v-btn @click="guestBtn" class="btn"
        ><span class="btnText">会員登録せずに予約する</span></v-btn
      >
    </div>
    <div v-else class="mt-10 text-right">
      <v-btn @click="nextBtn" size="large" class="btn"
        ><span class="btnText">搭乗者情報へ進む</span></v-btn>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
}
.item-flight-Wrapper {
  outline: 1px solid lightgray;
}
.imgWrapper {
  width: 200px;
  height: auto;
}
.img {
  width: 100%;
  height: 100%;
}
.img-flight-wrapper {
  outline: 1px solid lightgray;
}
.flightContents {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  /* padding: 1%; */
  width: 70%;
  margin: 5% 5% 5% 0;
}
.toFromText {
  gap: 1%;
}
.dotLine {
  margin-left: 0.3%;
}
.btn {
  background-color: #3498db;
  color: #ffff;
}
.btnText {
  font-weight: bold;
}
</style>
