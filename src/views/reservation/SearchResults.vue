<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SelectedBtn from "../../components/atoms/button/SelectedBtn.vue";
import TimeStamp from "../../components/atoms/TimeStamp.vue";

interface Reservations {
  id: string;
  user_id?: string;
  guest_id?: string;
  flight_id: number;
  flight_date: Date;
  number_of_passenger: number;
  total_price: number;
  appointment_date: Date;
  payment_method_id: number;
  payment_status_id: number;
}
interface Flights {
  id: number;
  flight: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  reservations: Reservations[];
}

// TOPから検索条件(from/to/passenger/flight_date)を受け取る
const route = useRoute();

const flightList: Ref<Flights[]> = ref([]);
const reservationList: Ref<Flights[]> = ref([]);
const matchDataList: Ref<any[]> = ref([]);
const flightNo: Ref<boolean> = ref(true);

const seatsLeft1: Ref<string | number | undefined> = ref("");
const seatsLeft2: Ref<string | number | undefined> = ref("");
const seatsLeft3: Ref<string | number | undefined> = ref("");
const seatsLeft4: Ref<string | number | undefined> = ref("");
const seatsLeft5: Ref<string | number | undefined> = ref("");
const seatsLeft6: Ref<string | number | undefined> = ref("");

// selectedBtnに渡すために使用
const conditionData = ref();

const loading = ref(true);

const timestamp = reactive({
  year: "",
  month: "",
  date: "",
});

onMounted(() => {
  // TOPから検索条件(from/to/passenger/flight_date)を受け取る
  console.log(route.query);
  const condition = route.query;
  conditionData.value = condition;

  console.log(condition.passenger);
  console.log(condition.flight_date);

  // 時間表示変更
  const date: any = new Date(condition.flight_date as any);
  timestamp.year = date.getFullYear();
  timestamp.month = date.getMonth() + 1;
  timestamp.date = date.getDate();

  // flightsテーブルの該当便取得
  fetch(
    `http://localhost:3000/matchFlights/?from=${condition.from}&to=${condition.to}`
  )
    .then((res) => res.json())
    .then((flights) => {
      console.log(flights);
      flightList.value = flights;
    });

  // reservationsに該当するデータがあった場合のみデータ取得
  // flight_dateの型変更したからエラーもし出たら対処する
  fetch(
    `http://localhost:3000/searchReservations/?flight_date=${condition.flight_date}&from=${condition.from}&to=${condition.to}`
  )
    .then((res) => res.json())
    .then((reservations) => {
      console.log(reservations);
      reservationList.value = reservations;

      // 結合したテーブルから同じ日付のデータのみに絞り込む
      reservations.map((data: Flights) => {
        // 入力した日付とデータの日付が一致するデータのみ返す(matchDate)
        const matchDate = data.reservations.filter((date) => {
          // 入力した日付とデータの日付の表記を合わせる
          // テーブルの日付を文字列に変換
          const stringDate = date.flight_date.toString();
          console.log(stringDate);

          return stringDate === condition.flight_date;
        });
        // mapの外で使用するため格納
        matchDataList.value.push(matchDate);
      });
      console.log(matchDataList.value);

      // 各フライトの予約人数を要素とする空配列用意
      const flight1: number[] = [];
      const flight2: number[] = [];
      const flight3: number[] = [];
      const flight4: number[] = [];
      const flight5: number[] = [];
      const flight6: number[] = [];

      // 日付が一致したデータをmapで回してフライトごとにする
      matchDataList.value.map((reservation) => {
        // reservationはフライトごとになってる
        console.log(reservation);

        // 人数を使用したいがreservation.number_of_passengerではundefinedになるためさらにmapで回す
        // resはフライトごとではなく、全部バラバラ
        reservation.map((res: Reservations) => {
          console.log(res);

          // フライトごとに人数だけをまとめる・画面表示用に1~3便と4~6便でbooleanを反転させる
          if (res.flight_id === 1) {
            flight1.push(res.number_of_passenger);
            flightNo.value = true;
          } else if (res.flight_id === 2) {
            flight2.push(res.number_of_passenger);
            flightNo.value = true;
          } else if (res.flight_id === 3) {
            flight3.push(res.number_of_passenger);
            flightNo.value = true;
          } else if (res.flight_id === 4) {
            flight4.push(res.number_of_passenger);
            flightNo.value = false;
          } else if (res.flight_id === 5) {
            flight5.push(res.number_of_passenger);
            flightNo.value = false;
          } else {
            flight6.push(res.number_of_passenger);
            flightNo.value = false;
          }
        });
      });
      console.log(flight1);
      console.log(flight2);
      console.log(flight3);
      console.log(flight4);
      console.log(flight5);
      console.log(flight6);

      // 同じ日付の各便の予約人数を足す
      const total1 = flight1.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      // 20を超えるかどうか判断
      if (total1 >= 20 || total1 + Number(condition.passenger) > 20) {
        seatsLeft1.value = "満席";
      } else {
        seatsLeft1.value = 20 - total1;
      }

      const total2 = flight2.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      if (total2 >= 20 || total2 + Number(condition.passenger) > 20) {
        seatsLeft2.value = "満席";
      } else {
        seatsLeft2.value = 20 - total2;
      }

      const total3 = flight3.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      if (total3 >= 20 || total3 + Number(condition.passenger) > 20) {
        seatsLeft3.value = "満席";
      } else {
        seatsLeft3.value = 20 - total3;
      }

      const total4 = flight4.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      if (total4 >= 20 || total4 + Number(condition.passenger) > 20) {
        seatsLeft4.value = "満席";
      } else {
        seatsLeft4.value = 20 - total4;
      }

      const total5 = flight5.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      if (total5 >= 20 || total5 + Number(condition.passenger) > 20) {
        seatsLeft5.value = "満席";
      } else {
        seatsLeft5.value = 20 - total5;
      }

      const total6 = flight6.reduce((sum: number, element: any) => {
        return sum + element;
      }, 0);
      if (total6 >= 20 || total6 + Number(condition.passenger) > 20) {
        seatsLeft6.value = "満席";
      } else {
        seatsLeft6.value = 20 - total6;
      }

      loading.value = false;
    }); //then
}); //onMounted
console.log(flightList.value);
</script>

<template>
  <template v-if="loading">
    <v-card height="190" class="text-center">
      <v-progress-circular
        :size="100"
        indeterminate
        color="#3498db"
        class="mt-4"
        >Loading...
      </v-progress-circular>
    </v-card>
  </template>
  <div v-else class="wrapper">
    <div class="text-h4">
      {{ conditionData.from }}&nbsp;ー&nbsp;{{ conditionData.to }}
    </div>
    <div class="mt-5 text-h6">
      <!-- {{ timestamp.year }}/{{ timestamp.month }}/{{ timestamp.date }} -->
      <TimeStamp :date="conditionData.flight_date" />
    </div>
    <div class="d-flex justify-space-between mt-8">
      <div class="d-flex">
        <v-icon icon="mdi-airplane" color="#3498db"></v-icon>
        <p class="text-h6">直行便({{ flightList.length }})</p>
      </div>
      <p class="text-subtitle-2">下記の運賃は、1人の運賃(税込)です</p>
    </div>
    <div
      v-for="flight in flightList"
      v-bind:key="flight.id"
      class="flightContents d-flex justify-space-around align-center"
    >
      <div>
        <div class="font-weight-bold">
          {{ flight.departure_time }}-{{ flight.arrival_time }}
        </div>
        <div>
          <div class="d-flex align-sm-center mt-2 mx-2 toFromText">
            <v-icon
              icon="mdi-circle-outline"
              color="#3498db"
              size="x-small"
            ></v-icon>
            <p class="font-weight-bold text-subtitle-1">
              {{ flight.from }}
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
            <p class="font-weight-bold text-subtitle-1">{{ flight.to }}</p>
          </div>
        </div>
        <!--to,dot,from -->
      </div>
      <!-- 時間と行き先-->
      <div>
        {{ flight.flight }}
      </div>
      <div>
        <p>所要時間</p>
        <p>
          <v-icon icon="mdi-clock"></v-icon
          ><span class="font-weight-bold">2h30</span>
        </p>
      </div>
      <SelectedBtn
        :flight_id="flight.id"
        :flight="flight.flight"
        :date="conditionData.flight_date"
        :passenger="conditionData.passenger"
        :price="flight.price"
      />
    </div>
    <!-- v-for -->

    <template v-if="flightNo">
      <div class="seat seat1">
        残席数<span class="font-weight-bold">{{ seatsLeft1 }}</span>
      </div>
      <div class="seat seat2">
        残席数<span class="font-weight-bold">{{ seatsLeft2 }}</span>
      </div>
      <div class="seat seat3">
        残席数<span class="font-weight-bold">{{ seatsLeft3 }}</span>
      </div>
    </template>
    <template v-else>
      <div class="seat seat1">
        残席数<span class="font-weight-bold">{{ seatsLeft4 }}</span>
      </div>
      <div class="seat seat2">
        残席数<span class="font-weight-bold">{{ seatsLeft5 }}</span>
      </div>
      <div class="seat seat3">
        残席数<span class="font-weight-bold">{{ seatsLeft6 }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
}
.flightContents {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
  position: relative;
}
.toFromText {
  gap: 1%;
}
.dotLine {
  margin-left: 0.3%;
}
.seat {
  position: absolute;
  font-size: 0.9rem;
}
.seat1 {
  /* position: absolute; */
  top: 45%;
  left: 82%;
}
.seat2 {
  /* position: static; */
  top: 70%;
  left: 82%;
}
.seat3 {
  /* position: static; */
  top: 94%;
  left: 82%;
}
</style>
