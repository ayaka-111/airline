<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import TimeStamp from "../components/atoms/TimeStamp.vue";
import ReferenceTable from "../components/molecules/ReferenceTable.vue";

// myPageからreservationsのid受け取る
const route = useRoute();
const id = route.params.id;
console.log(id);

const reservationData = ref();
const loading = ref(true);

// reservationsからidを指定して取得
const getReservation = async () => {
  const response = await fetch(
    `http://localhost:3000/joinReservations/?id=${id}`
  );
  const data = await response.json();
  reservationData.value = data;
  loading.value = false;
  console.log(data);
};

getReservation();
console.log(reservationData.value);
</script>

<template>
  <template v-if="loading">
      <v-card height="190" class="text-center">
        <v-progress-circular
          :size="100"
          indeterminate
          color="#3498db"
          class="mt-4 "
        >Loading...
        </v-progress-circular>
      </v-card>
  </template>
  <template v-else>
    <ReferenceTable :reservationData="reservationData[0]" />
    <!-- <div class="text-h5">ご予約内容</div>
    <div class="wrapper">
      <section class="my-5">
        <p class="text-h6">
          <v-icon icon="mdi-cash"></v-icon>
          お支払い情報
        </p>
        <v-table>
          <thead>
            <tr>
              <th>お支払い状態</th>
              <th>お支払い方法</th>
              <th>合計金額</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ reservationData[0].payment_status.status }}</td>
              <td>{{ reservationData[0].payment_method.status }}</td>
              <td>¥{{reservationData[0].total_price }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <section class="my-5">
        <p class="text-h6">
          <v-icon icon="mdi-airplane"></v-icon>
          ご搭乗便情報
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
              <td><TimeStamp :date="reservationData[0].flight_date" /></td>
              <td>{{ reservationData[0].flight.flight }}</td>
              <td>{{ reservationData[0].flight.from }}</td>
              <td>{{ reservationData[0].flight.departure_time }}</td>
              <td>{{ reservationData[0].flight.from }}</td>
              <td>{{ reservationData[0].flight.arrival_time }}</td>
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
          <tbody>
            <tr
              v-for="(passenger, index) in reservationData[0].passengers"
              :key="passenger"
            >
              <td>{{ index + 1 }}</td>
              <td>
                {{ passenger.first_name }}&nbsp;{{ passenger.last_name }}
              </td>
              <td><TimeStamp :date="passenger.date_of_birth" /></td>
              <td>{{ passenger.gender }}</td>
              <td>¥{{ reservationData[0].flight.price}}</td>
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
          <tbody>
            <tr>
              <td>
                {{ reservationData[0].users.first_name }}&nbsp;{{
                  reservationData[0].users.last_name
                }}
              </td>
              <td>
                <TimeStamp :date="reservationData[0].users.date_of_birth" />
              </td>
              <td>{{ reservationData[0].users.gender }}</td>
              <td>{{ reservationData[0].users.email }}</td>
              <td>{{ reservationData[0].users.phone }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
    </div> -->
  </template>
</template>

<style scoped>
.wrapper {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
  margin-top: 5%;
}
</style>
