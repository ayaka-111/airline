<script setup lang="ts">
import { reactive } from "vue";

const guest = reactive({
  date: "",
  flight:"",
  first_name: "",
  last_name: "",
})

// 予約内容を検索する
// reservationsテーブルから該当のデータを検索
// リアクティブデータ全てが検索するのに必須条件
const referenceBtn = () => {
  console.log("照会")
}
</script>

<template>
  <h1>予約確認</h1>
  <v-form @submit.prevent>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Date"
        type="date"
        v-model="guest.date"
        hint="搭乗日を入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Flight"
        placeholder="HN900"
        type="text"
        v-model="guest.flight"
        hint="便名を5桁または6桁で入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="guest.first_name"
        hint="予約された方の名前を入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="guest.last_name"
        hint="予約された方の名字を入力してください"
      ></v-text-field>
    </v-responsive>
    <v-btn rounded="pill" color="#4682B4" @click="referenceBtn">予約確認</v-btn>
  </v-form>
</template>
