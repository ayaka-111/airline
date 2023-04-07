<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/index";
import { useGuestStore } from "../../stores/guest";

interface Guest {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  gender: String;
  date_of_birth: Date;
  phone: String;
}

// const guests: Ref<Guest[]> = ref([]);

// 入力された値を保持
let guestData: {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
} = reactive({
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
});

const router = useRouter();

const guestStore = useGuestStore();

// firebaseの会員登録も追加する
const addGuest = async () => {
  try {
    const response = await fetch("http://localhost:3000/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: guestData.email,
        first_name: guestData.firstName,
        last_name: guestData.lastName,
        date_of_birth: new Date(guestData.dateOfBirth),
        gender: guestData.gender,
        phone: guestData.phone,
      }),
    });
    const data = await response.json();
    // guests.value.push(data);

    // 追加したゲスト情報をpiniaにも追加する
    (guestStore as any).getGuestData(data.id);

    // 搭乗者入力画面に遷移
    router.push("/passenger");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="wrapper">
  <div class="text-h5 text-center mb-3">予約者情報</div>
  <v-form @submit.prevent="addGuest">
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="guestData.firstName"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="guestData.lastName"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="guestData.dateOfBirth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="guestData.gender">
        <v-radio label="Male" value="male" name="gender"></v-radio>
        <v-radio label="Female" value="female" name="gender"></v-radio>
      </v-radio-group>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Email address"
        placeholder="johndoe@gmail.com"
        type="email"
        v-model="guestData.email"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Phone"
        placeholder="09012345678"
        type="text"
        v-model="guestData.phone"
        hint="ハイフン不要"
      ></v-text-field>
    </v-responsive>
    <div class="text-center mt-10 mb-5">
      <v-btn rounded="pill" color="#3498db" type="submit"><span class="btnText">次へ</span></v-btn>
    </div>
  </v-form>
</div>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
  margin-top: 5%;
}
.btnText {
  font-weight: bold;
  color: #ffff;
}
</style>
