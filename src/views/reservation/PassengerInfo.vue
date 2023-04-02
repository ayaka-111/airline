<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { usePassengerStore } from "../../stores/passenger";

interface Passenger {
  id: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
}

// const passengers: Ref<Passenger[]> = ref([]);

const router = useRouter();

// 入力された値を保持
let passengerData: {
  first_name: string;
  last_name: string;
  date_of_birth: Date | String;
  gender: string;
} = reactive({
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
});

const addPassenger = async () => {
  try {
    // passengerテーブルに追加
    // const response = await fetch("http://localhost:3000/passengers", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     first_name: passengerData.firstName,
    //     last_name: passengerData.lastName,
    //     date_of_birth: new Date(passengerData.dateOfBirth),
    //     gender: passengerData.gender,
    //   }),
    // });
    // const data = await response.json();
    // console.log(data.id);

    // piniaに保存
    const passengerStore = usePassengerStore();
    // (passengerStore as any).getId(data.id)
    (passengerStore as any).getPassenger(passengerData);
    // 最終確認画面に遷移
    router.push("/finalConfirmation");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <h1>搭乗者情報</h1>
  <v-form @submit.prevent="addPassenger">
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData.gender">
        <v-radio id="male" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <div>
      <v-btn rounded="pill" color="#4682B4" type="submit">最終確認へ</v-btn>
    </div>
  </v-form>
</template>
