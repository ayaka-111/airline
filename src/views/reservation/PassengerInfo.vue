<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import type { Ref, ComputedRef } from "vue";
import { usePassengerStore } from "../../stores/passenger";
import { useBookingStore } from "../../stores/booking";
import { useAuthStore } from "../../stores/auth";
import { auth } from "../../../firebase";

interface Passenger {
  id: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
}
interface User {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

// const passengers: Ref<Passenger[]> = ref([]);

const router = useRouter();

// 入力された値を保持
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

const enabled2 = ref(false);
const enabled3 = ref(false);
const enabled4 = ref(false);
const enabled5 = ref(false);
const enabled6 = ref(false);

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
        passengerData3,
      ]);
    } else if (passengerNum.value === "4") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4,
      ]);
    } else if (passengerNum.value === "5") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4,
        passengerData5,
      ]);
    } else if (passengerNum.value === "6") {
      (passengerStore as any).getPassenger([
        passengerData1,
        passengerData2,
        passengerData3,
        passengerData4,
        passengerData5,
        passengerData6,
      ]);
    }

    // 最終確認画面に遷移
    router.push("/finalConfirmation");
  } catch (error) {
    console.log(error);
    alert("正しく入力してください");
  }
};

// 登録情報呼び出し
const inputData = () => {
  const authStore = useAuthStore();
  const userData:any = computed(()=>{
    return authStore.userData;
  });
  const currentUser = computed(()=>{
    return authStore.currentUser;
  });

  const timestamp = reactive({
      year: "",
      month: "",
      date: "",
    });
    const date: any = new Date(userData.value.date_of_birth);
    timestamp.year = date.getFullYear();
    timestamp.month = date.getMonth() + 1;
    timestamp.date = date.getDate();

  if(currentUser.value !== null){
    console.log("会員")
    passengerData1.first_name = userData.value.first_name;
    passengerData1.last_name = userData.value.last_name;
    passengerData1.gender = userData.value.gender;
    passengerData1.date_of_birth = `${timestamp.year}-${timestamp.date}-${timestamp.date}`;
  }else {
    console.log("ゲスト")
  }
}

// ボタンを非活性化
const passengerSubmit = computed(()=>{
  // if(passengerNum.value === "2" && passengerData2.first_name.length > 0 && passengerData2.last_name.length > 0 && passengerData2.gender !== "" && passengerData2.date_of_birth !== ""){
  //   return true
  // }
  if(passengerNum.value === "1" && enabled2.value === false ||passengerNum.value === "2" && enabled2.value === true || passengerNum.value === "3" && enabled3.value === true || passengerNum.value === "4" && enabled4.value === true || passengerNum.value === "5" && enabled5.value === true || passengerNum.value === "6" && enabled6.value === true) {
    return true
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="text-h6 passenger ml-5">
      <v-icon icon="mdi-account-multiple" size="large"></v-icon>搭乗者
    </div>

    <v-form @submit.prevent="addPassenger">
      <!-- <v-btn @click="inputData">予約者と同じ</v-btn> -->
      <p class="ml-16 mt-5">搭乗者1</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData1.first_name"
            hint="パスポート記載のとおり入力してください"
            :rules="[() => !!passengerData1.first_name || 'This field is required']"
            required
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
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData1.date_of_birth"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData1.gender" required>
            <v-radio
              id="male1"
              label="Male"
              value="male"
              name="gender"
            ></v-radio>
            <v-radio
              id="female1"
              label="Female"
              value="female"
              name="gender"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <hr />
      <v-checkbox-btn
        v-model="enabled2"
        class="pe-2"
        label="搭乗者追加"
      ></v-checkbox-btn>
      <p class="ml-16 mt-5">搭乗者2</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData2.first_name"
            hint="パスポート記載のとおり入力してください"
            :disabled="!enabled2"
            required
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
            :disabled="!enabled2"
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData2.date_of_birth"
            :disabled="!enabled2"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData2.gender" required>
            <v-radio
              id="male2"
              label="Male"
              value="male"
              name="gender"
            :disabled="!enabled2"
            ></v-radio>
            <v-radio
              id="female2"
              label="Female"
              value="female"
              name="gender"
            :disabled="!enabled2"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <hr />
      <v-checkbox-btn
        v-model="enabled3"
        class="pe-2"
        label="搭乗者追加"
      ></v-checkbox-btn>
      <p class="ml-16 mt-5">搭乗者3</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData3.first_name"
            hint="パスポート記載のとおり入力してください"
            :disabled="!enabled3"
            required
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
            :disabled="!enabled3"
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData3.date_of_birth"
            :disabled="!enabled3"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData3.gender" required>
            <v-radio
              id="male3"
              label="Male"
              value="male"
              name="gender"
            :disabled="!enabled3"
            ></v-radio>
            <v-radio
              id="female3"
              label="Female"
              value="female"
              name="gender"
            :disabled="!enabled3"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <hr />
      <v-checkbox-btn
        v-model="enabled4"
        class="pe-2"
        label="搭乗者追加"
      ></v-checkbox-btn>
      <p class="ml-16 mt-5">搭乗者4</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData4.first_name"
            hint="パスポート記載のとおり入力してください"
            :disabled="!enabled4"
            required
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
            :disabled="!enabled4"
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData4.date_of_birth"
            :disabled="!enabled4"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData4.gender" required>
            <v-radio
              id="male4"
              label="Male"
              value="male"
              name="gender"
            :disabled="!enabled4"
            ></v-radio>
            <v-radio
              id="female4"
              label="Female"
              value="female"
              name="gender"
            :disabled="!enabled4"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <hr />
      <v-checkbox-btn
        v-model="enabled5"
        class="pe-2"
        label="搭乗者追加"
      ></v-checkbox-btn>
      <p class="ml-16 mt-5">搭乗者5</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData5.first_name"
            hint="パスポート記載のとおり入力してください"
            :disabled="!enabled5"
            required
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
            :disabled="!enabled5"
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData5.date_of_birth"
            :disabled="!enabled5"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData5.gender" required>
            <v-radio
              id="male5"
              label="Male"
              value="male"
              name="gender"
            :disabled="!enabled5"
            ></v-radio>
            <v-radio
              id="female5"
              label="Female"
              value="female"
              name="gender"
            :disabled="!enabled5"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <hr />
      <v-checkbox-btn
        v-model="enabled6"
        class="pe-2"
        label="搭乗者追加"
      ></v-checkbox-btn>
      <p class="ml-16 mt-5">搭乗者6</p>
      <div class="d-flex mt-2">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="First Name"
            placeholder="John"
            type="text"
            v-model="passengerData6.first_name"
            hint="パスポート記載のとおり入力してください"
            :disabled="!enabled6"
            required
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
            :disabled="!enabled6"
            required
          ></v-text-field>
        </v-responsive>
      </div>
      <div class="d-flex my-5">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            hide-details="auto"
            label="Birth of Date"
            type="date"
            v-model="passengerData6.date_of_birth"
            :disabled="!enabled6"
            required
          ></v-text-field>
        </v-responsive>
        <v-responsive class="mx-auto" max-width="344">
          <v-radio-group inline v-model="passengerData6.gender" required>
            <v-radio
              id="male6"
              label="Male"
              value="male"
              name="gender"
            :disabled="!enabled6"
            ></v-radio>
            <v-radio
              id="female6"
              label="Female"
              value="female"
              name="gender"
            :disabled="!enabled6"
            ></v-radio>
          </v-radio-group>
        </v-responsive>
      </div>
      <div class="text-right" v-if="passengerSubmit">
        <v-btn rounded="pill" color="#3498db" type="submit" class="btn"
          ><span class="btnText">最終確認へ</span></v-btn
        >
      </div>
      <div class="text-right" v-else>
        <v-btn rounded="pill" color="#87cefa" class="btn"
          ><span class="btnText">最終確認へ</span></v-btn
        >
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
}
hr {
  color: lightgray;
}
.btn {
  color: #ffff;
}
.btnText {
  font-weight: bold;
}
</style>
