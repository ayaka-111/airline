<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGuestReservationStore } from "../../stores/guestReservation";

const guest = reactive({
  flight_date: "",
  first_name: "",
  last_name: "",
  email: "",
});

const router = useRouter();
const guestReservationStore = useGuestReservationStore();

const referenceBtn = () => {
  // reservationsテーブルから該当のデータを検索してpiniaに保管
  // リアクティブデータ全てが検索するのに必須条件
  (guestReservationStore as any).getReservationData(
    guest.flight_date,
    guest.first_name,
    guest.last_name,
    guest.email
  );

  const reservationData = computed(() => {
    return (guestReservationStore as any).reservationData;
  });

  router.push("/guestReference");
};

const signIn = () => {
  router.push("/signIn");
};
</script>

<template>
  <div class="wrapper">
    <div class="text-h5 text-center mb-5">予約確認</div>
    <v-form @submit.prevent>
      <v-responsive class="mx-auto" max-width="344">
        <v-text-field
          hide-details="auto"
          label="FlightDate"
          type="date"
          v-model="guest.flight_date"
          hint="搭乗日を入力してください"
        ></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" max-width="344">
        <v-text-field
          hide-details="auto"
          label="First Name"
          placeholder="John"
          type="text"
          v-model="guest.first_name"
          hint="予約した方の名前を入力してください"
        ></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" max-width="344">
        <v-text-field
          hide-details="auto"
          label="Last Name"
          placeholder="Smith"
          type="text"
          v-model="guest.last_name"
          hint="予約した方の名字を入力してください"
        ></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" max-width="344">
        <v-text-field
          hide-details="auto"
          label="Email"
          placeholder="john@example.com"
          type="email"
          v-model="guest.email"
          hint="予約した時に使用したメールアドレスを入力してください"
        ></v-text-field>
      </v-responsive>
      <div class="text-center mt-10 mb-5">
      <v-btn rounded="pill" color="#3498db" @click="referenceBtn" class="btn"
        ><span class="btnText">予約確認</span></v-btn
      >
    </div>
    </v-form>
    <div class="text-center">
    <v-btn @click="signIn" class="signInBtn"><span class="btnText">会員登録している方はこちら</span></v-btn>
  </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
  margin-top: 10%;
}
.btn {
  color: #ffff;
}
.btnText {
  font-weight: bold;
}
.signInBtn {
  color: #3498db;
}
</style>
