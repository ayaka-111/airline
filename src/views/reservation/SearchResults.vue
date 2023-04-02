<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SelectedBtn from "../../components/atoms/button/SelectedBtn.vue";

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

onMounted(() => {
  // TOPから検索条件(from/to/passenger/flight_date)を受け取る
  console.log(route.query);
  const condition = route.query;
  conditionData.value = condition;

  console.log(condition.passenger);

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
    }); //then
}); //onMounted
</script>

<template>
  <h1>検索結果</h1>
  <div v-for="flight in flightList" v-bind:key="flight.id">
    <div>{{ flight.flight }}</div>
    <div>{{ flight.departure_time }}-{{ flight.arrival_time }}</div>
    <!-- <div>{{ flight.price }}</div> -->
    <SelectedBtn
      :flight_id="flight.id"
      :flight="flight.flight"
      :date="conditionData.flight_date"
      :passenger="conditionData.passenger"
      :price="flight.price"
    />
  </div>

  <div v-if="flightNo">
    <div>HN0900{{ seatsLeft1 }}</div>
    <div>HN1300 {{ seatsLeft2 }}</div>
    <div>HN1800 {{ seatsLeft3 }}</div>
  </div>
  <div v-else>
    <div>NH1000 {{ seatsLeft4 }}</div>
    <div>NH1400 {{ seatsLeft5 }}</div>
    <div>NH1900 {{ seatsLeft6 }}</div>
  </div>
</template>
