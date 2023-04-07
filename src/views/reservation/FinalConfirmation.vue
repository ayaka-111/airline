<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useBookingStore } from "../../stores/booking";
import { useRouter } from "vue-router";
import { usePassengerStore } from "../../stores/passenger";
import { useGuestStore } from "../../stores/guest";
import TimeStamp from "../../components/atoms/TimeStamp.vue";

interface User {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

interface PassengerPinia {
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
}

// ログインユーザー情報
const loginUser: Ref<User | undefined> = ref();
const loginUserUid: Ref<any> = ref("");
// flight情報
const flight = ref();
// const chooseFlightId = ref();
const chooseDate = ref();
const choosePassengerNum = ref();
// 搭乗者情報→配列にした方がいい？
const passenger = ref();
// const passenger_id = ref();

const router = useRouter();

// onMounted(() => {
// 予約者情報取得
// ①ログインしているユーザーの場合
// authStore呼び出し
const authStore = useAuthStore();

// uid取得
const uid = computed(() => {
  return authStore.uid;
});
// loginUserUid.value = uid;
// console.log(uid.value);
// ログインしているか判断
const currentUser = computed(() => {
  return authStore.currentUser;
});

// 自分のidを指定して情報取得
const loginUserData: any = computed(() => {
  return authStore.userData;
});
console.log(loginUserData.value);
// const getUser = async () => {
//   const response = await fetch(`http://localhost:3000/users/${uid.value}`);
//   const data = await response.json();
//   loginUser.value = data;
//   console.log(data);
// };
// getUser();
// })

// ②ゲストの場合
// guest情報pinia呼び出し
const guestStore = useGuestStore();
const guestData = computed(() => {
  return (guestStore as any).guestData;
});
console.log(guestData.value);

// 搭乗者情報取得
const passengerStore = usePassengerStore();
// const passengerId = computed(() => {
//   return (passengerStore as any).id;
// });
// console.log(passengerId.value);
// (passengerStore as any).getPassenger(passengerId.value);
const passengerData = computed(() => {
  return (passengerStore as any).passenger;
});

console.log(passengerData.value);

// passengerData.value.map((passenger:PassengerPinia)=>{
//   console.log(passenger.first_name)
// })

// console.log(passengerId.value);
// const getPassenger = async () => {
//   const response = await fetch(
//     `http://localhost:3000/passengers/${passengerId.value}`
//   );
//   const data = await response.json();
//   passenger.value = data;
//   console.log(data);
// };
// getPassenger();

// })  //onMount

// 予約内容取得
const bookingStore = useBookingStore();
// const selectedFlightId = computed(() => {
//   return (bookingStore as any).flight_id;
// });

// 該当便の情報をflightsテーブルから取得する
const flightData = computed(() => {
  return (bookingStore as any).flight;
});
// const getFlight = async () => {
//   const response = await fetch(
//     `http://localhost:3000/flights/${selectedFlightId.value}`
//   );
//   const data = await response.json();
//   flight.value = data;
//   console.log(data)
// };
// getFlight();
// console.log(flight.value)

// const selectedFlight = computed(() => {
//   return (bookingStore as any).flight;
// });

const selectedDate = computed(() => {
  return (bookingStore as any).date;
});
// chooseDate.value = selectedDate.value;

const selectedPassenger: ComputedRef<number> = computed(() => {
  return (bookingStore as any).passengerNum;
});
// choosePassengerNum.value = selectedPassenger.value;

// }); //onBeforeMount

// 合計金額計算する
const totalPrice = computed(() => {
  return Number(selectedPassenger.value) * 10000;
});

// const nowDate = new Date();
// console.log(nowDate.toString())
// console.log(nowDate)

// 予約確定ボタン
const confirmed = async () => {
  const nowDate = new Date().toLocaleString("ja-JP", {
    timeZone: "Europe/London",
  });
  console.log(new Date(nowDate).toString());

  if (currentUser.value !== null) {
    console.log("会員");
    // 会員の場合
    //reservationsに追加する
    const response = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: uid.value,
        flight_id: flightData.value.id,
        flight_date: selectedDate.value,
        number_of_passenger: Number(selectedPassenger.value),
        total_price: totalPrice.value,
        appointment_date: new Date(nowDate).toISOString(),
        payment_method_id: 1,
        payment_status_id: 1,
        // passengers: [passengerData.value.id],
      }),
    });
    const reservationData = await response.json();
    console.log(reservationData);

    // usersテーブルのreservationsを更新する→reservationsテーブルのuser_idで既に紐付けされてる
    // const updateUser = await fetch(
    //   `http://localhost:3000/users${uid.value}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       reservations: reservationData.id,
    //     }),
    //   }
    // );
    // const updateUserData = await updateUser.json();
    passengerData.value.map(async (passenger: PassengerPinia) => {
      // 搭乗者情報をpassengersに追加する
      const addPassenger = await fetch("http://localhost:3000/passengers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // あとで！！一つ一つではなく、配列をmap回しながら要素指定する必要がありそう
        body: JSON.stringify({
          first_name: passenger.first_name,
          last_name: passenger.last_name,
          date_of_birth: new Date(passenger.date_of_birth),
          gender: passenger.gender,
          reservation_id: reservationData.id,
        }),
      });
      const addPassengerData = await addPassenger.json();
      console.log(addPassengerData);
    });
  } else {
    console.log("ゲスト");
    // reservationsに追加する
    const guestResponse = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_id: guestData.value.id,
        flight_id: flightData.value.id,
        flight_date: selectedDate.value,
        number_of_passenger: Number(selectedPassenger.value),
        total_price: totalPrice.value,
        appointment_date: new Date(nowDate).toISOString(),
        payment_method_id: 1,
        payment_status_id: 1,
        passengers: [passengerData.value.id],
      }),
    });
    const guestReservationData = await guestResponse.json();
    console.log(guestReservationData);

    // passenger追加
    const addGuestPassenger = await fetch("http://localhost:3000/passengers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: passengerData.value.first_name,
        last_name: passengerData.value.last_name,
        date_of_birth: new Date(passengerData.value.date_of_birth),
        gender: passengerData.value.gender,
        reservation_id: guestReservationData.id,
      }),
    });
    const addGuestPassengerData = await addGuestPassenger.json();
    console.log(addGuestPassengerData);
  }

  // Piniaリセット(bookingStore,passengerStore)
  bookingStore.$reset();
  passengerStore.$reset();
  guestStore.$reset();

  // 予約完了画面に遷移
  router.push("/completed");
}; //confirmedボタン
</script>

<template>
  <div class="wrapper">
    <div class="text-h5">最終確認</div>
    <div class="ConfirmationWrapper">
      <section class="my-5">
        <p class="text-h6">
          <v-icon icon="mdi-airplane"></v-icon>
          ご予約便情報
        </p>
        <v-table>
          <thead>
            <tr>
              <th>搭乗日</th>
              <th>便名</th>
              <th>出発地</th>
              <th>出発時間</th>
              <th>到着地</th>
              <th>到着時間</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><TimeStamp :date="selectedDate" /></td>
              <td>{{ flightData.flight }}</td>
              <td>{{ flightData.from }}</td>
              <td>{{ flightData.departure_time }}</td>
              <td>{{ flightData.from }}</td>
              <td>{{ flightData.arrival_time }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <section class="my-5">
        <p class="text-h6">
          <v-icon icon="mdi-seat-passenger"></v-icon>
          ご搭乗者情報
        </p>
        <v-table>
          <thead>
            <tr>
              <th>ご搭乗者</th>
              <th>お名前</th>
              <th>生年月日</th>
              <th>性別</th>
              <th>料金</th>
            </tr>
          </thead>
          <tbody v-if="passengerData.length >= 2">
            <tr v-for="(passenger, index) in passengerData" :key="passenger">
              <td>{{ index + 1 }}</td>
              <td>{{ passenger.first_name }}&nbsp;{{ passenger.last_name }}</td>
              <td><TimeStamp :date="passenger.date_of_birth" /></td>
              <td>{{ passenger.gender }}</td>
              <td>¥{{ flightData.price }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>1</td>
              <td>
                {{ passengerData.first_name }}&nbsp;{{
                  passengerData.last_name
                }}
              </td>
              <td><TimeStamp :date="passengerData.date_of_birth" /></td>
              <td>{{ passengerData.gender }}</td>
              <td>¥{{ flightData.price.toLocaleString() }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <section class="my-5">
        <p class="text-h6">
          <v-icon icon="mdi-account"></v-icon>
          ご予約者情報
        </p>
        <v-table>
          <thead>
            <tr>
              <th>お名前</th>
              <th>生年月日</th>
              <th>性別</th>
              <th>メールアドレス</th>
              <th>電話番号</th>
            </tr>
          </thead>
          <tbody v-if="currentUser !== null">
            <tr>
              <td>
                {{ loginUserData.first_name }}&nbsp;{{
                  loginUserData.last_name
                }}
              </td>
              <td>
                <TimeStamp :date="loginUserData.date_of_birth" />
              </td>
              <td>{{ loginUserData.gender }}</td>
              <td>{{ loginUserData.email }}</td>
              <td>{{ loginUserData.phone }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>{{ guestData.first_name }}&nbsp;{{ guestData.last_name }}</td>
              <td>
                <TimeStamp :date="guestData.date_of_birth" />
              </td>
              <td>{{ guestData.gender }}</td>
              <td>{{ guestData.email }}</td>
              <td>{{ guestData.phone }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <div class="text-h6 text-right my-5">
        合計金額:&nbsp;¥{{ totalPrice.toLocaleString() }}
      </div>
      <div class="text-center mb-5">
        <v-btn @click="confirmed" color="#3498db"
          ><span class="btnText">予約確定</span></v-btn
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
}
.ConfirmationWrapper {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
  margin-top: 5%;
}
.btnText {
  color: #ffff;
  font-weight: bold;
}
</style>
