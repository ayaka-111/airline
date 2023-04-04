<script setup lang="ts">
import { computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGuestReservationStore } from "../../stores/guestReservation";

const router = useRouter();

const route = useRoute();
const currentPath = computed(()=>{
  return route.path;
})
console.log(currentPath.value)

const guestReservationStore = useGuestReservationStore();

const reservationData = computed(() => {
  return (guestReservationStore as any).reservationData;
});
// const a = new Date(reservationData.value[0].flight_date);
// const b = a.toISOString();
// console.log(a);
// onUnmounted(() =>{
//     guestReservationStore.$reset();
// })

const backBtn = () => {
  router.push("/referenceForm");
};

if(currentPath.value !== "/guestReference"){
  guestReservationStore.$reset();
}
</script>

<template>
  <div>ご予約の確認</div>

  <template v-if="reservationData.length === 0">
    <p>該当するデータはありません</p>
    <v-btn @click="backBtn">戻る</v-btn>
  </template>

  <template v-else>
    <div>
      <p>ご予約内容</p>
      <div>
        <p>お支払い状態</p>
        <p>{{ reservationData[0].payment_status.status }}</p>
      </div>
      <div>
        <p>お支払い方法</p>
        <p>{{ reservationData[0].payment_method.status }}</p>
      </div>
      <div>
        <p>合計金額</p>
        <p>{{ reservationData[0].total_price }}</p>
      </div>
    </div>

    <div>
      <p>ご搭乗便情報</p>
      <div>
        <p>搭乗日</p>
        <p>{{ reservationData[0].flight_date }}</p>
      </div>
      <div>
        <p>便名</p>
        <p>{{ reservationData[0].flight.flight }}</p>
      </div>
      <div>
        <p>出発地</p>
        <p>{{ reservationData[0].flight.from }}</p>
      </div>
      <div>
        <p>出発時間</p>
        <p>{{ reservationData[0].flight.departure_time }}</p>
      </div>
      <div>
        <p>到着地</p>
        <p>{{ reservationData[0].flight.to }}</p>
      </div>
      <div>
        <p>到着時間</p>
        <p>{{ reservationData[0].flight.arrival_time }}</p>
      </div>
    </div>

    <div>
      <p>お客様情報</p>
      <div
        v-for="passenger in reservationData[0].passengers"
        :key="passenger.id"
      >
        <div>
          <p>ご搭乗者</p>
          <!-- indexがいい -->
          <p>大人1</p>
        </div>
        <div>
          <p>お名前</p>
          <p>{{ passenger.first_name }}:&nbsp;{{ passenger.last_name }}</p>
        </div>
        <div>
          <p>生年月日</p>
          <p>{{ passenger.date_of_birth.toString() }}</p>
        </div>
        <div>
          <p>性別</p>
          <p>{{ passenger.gender }}</p>
        </div>
      </div>
    </div>

    <div>
      <p>ご連絡先</p>
      <div>
        <p>連絡先電話番号</p>
        <p>{{ reservationData[0].guests.phone }}</p>
      </div>
      <div>
        <p>メールアドレス</p>
        <p>{{ reservationData[0].guests.email }}</p>
      </div>
    </div>
  </template>
</template>
