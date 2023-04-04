<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGuestReservationStore } from "../../stores/guestReservation";

const guest = reactive({
  flight_date: "",
  first_name: "",
  last_name: "",
  email: "",
})

const router = useRouter();
const guestReservationStore = useGuestReservationStore();

const referenceBtn = () => {
// reservationsテーブルから該当のデータを検索してpiniaに保管
// リアクティブデータ全てが検索するのに必須条件
  (guestReservationStore as any).getReservationData(guest.flight_date, guest.first_name, guest.last_name, guest.email);

  const reservationData = computed(()=>{
    return (guestReservationStore as any).reservationData;
  })

  router.push("/guestReference")

}

const signIn = () => {
  router.push("/signIn")
}
</script>

<template>
  <h1>予約確認</h1>
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
    <!-- <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Flight"
        placeholder="HN900"
        type="text"
        v-model="guest.flight"
        hint="便名を5桁または6桁で入力してください"
      ></v-text-field>
    </v-responsive> -->
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
    <v-btn rounded="pill" color="#4682B4" @click="referenceBtn">予約確認</v-btn>
  </v-form>
  <v-btn @click="signIn">会員登録している方はこちら</v-btn>
</template>
