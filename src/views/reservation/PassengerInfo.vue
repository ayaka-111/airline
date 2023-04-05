<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import type { Ref } from "vue";
import { usePassengerStore } from "../../stores/passenger";
import { useBookingStore } from "../../stores/booking";

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
// let passengerData: {
//   n: {
//   first_name: string;
//   last_name: string;
//   date_of_birth: Date | String;
//   gender: string;
//   }
// } = reactive({
//   n: {
//   first_name: "",
//   last_name: "",
//   date_of_birth: "",
//   gender: "",
//   }
// });

// let passengerData: {
//   first_name: string;
//   last_name: string;
//   date_of_birth: Date | String;
//   gender: string;
// } = reactive({
//   first_name: "",
//   last_name: "",
//   date_of_birth: "",
//   gender: "",
// });

let passengerData1: {
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

let passengerData2: {
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

let passengerData3: {
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

let passengerData4: {
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

let passengerData5: {
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

let passengerData6: {
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

const bookingStore = useBookingStore();
const passengerNum = computed(() => {
  return (bookingStore as any).passengerNum;
});

console.log(typeof passengerNum.value);

// 最終確認へボタン
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

    // pinia呼び出し
    const passengerStore = usePassengerStore();
    // (passengerStore as any).getId(data.id)

    // piniaに入力された値を保存
    if (passengerNum.value === "1") {
      (passengerStore as any).getPassenger(passengerData1);
    } else if (passengerNum.value === "2") {
      (passengerStore as any).getPassenger([passengerData1, passengerData2]);
    } else if (passengerNum.value === "3") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3
    ]);
    } else if (passengerNum.value === "4") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4
    ]);
    } else if (passengerNum.value === "5") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4,
        passengerData5
    ]);
    } else if (passengerNum.value === "6") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4,
        passengerData5,
        passengerData6
    ]);
    }

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
    <!-- <div v-for="n in Number(passengerNum)" :key="n"> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData1.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData1.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData1.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData1.gender">
        <v-radio id="male1" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female1"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <!-- </div> -->
    <hr />
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData2.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData2.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData2.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData2.gender">
        <v-radio id="male2" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female2"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <hr />
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData3.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData3.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData3.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData3.gender">
        <v-radio id="male3" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female3"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <hr />
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData4.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData4.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData4.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData4.gender">
        <v-radio id="male4" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female4"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <hr />
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData5.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData5.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData5.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData5.gender">
        <v-radio id="male5" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female5"
          label="Female"
          value="female"
          name="gender"
        ></v-radio>
      </v-radio-group>
    </v-responsive>
    <hr />
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="passengerData6.first_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="passengerData6.last_name"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="passengerData6.date_of_birth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline v-model="passengerData6.gender">
        <v-radio id="male6" label="Male" value="male" name="gender"></v-radio>
        <v-radio
          id="female6"
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
