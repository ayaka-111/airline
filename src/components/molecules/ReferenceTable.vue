<script lang="ts">
import { defineComponent } from "vue"
import TimeStamp from "../atoms/TimeStamp.vue";

interface Users {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  phone: string;
}
interface Guests {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
  phone: string;
  reservation: Reservations[];
}
interface Passengers {
  id: string;
  reservation_id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
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
interface Payment {
  id: number;
  status: string;
}
interface Reservations {
  id: string;
  user_id?: string;
  users: Users;
  guest_id?: string;
  guests: Guests;
  flight_id: number;
  flight: Flights;
  flight_date: Date;
  number_of_passenger: number;
  total_price: number;
  appointment_date: Date;
  payment_method_id: number;
  payment_method: Payment;
  payment_status_id: number;
  payment_status: Payment;
  passengers: Passengers[];
}

export default defineComponent({
  name: "ReferenceTable",
  props: ["reservationData"],
  components: { TimeStamp },
  setup: (props)=>{

    console.log(props.reservationData)

  }
})
</script>

<template>
  <div class="text-h5">ご予約内容</div>
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
              <td>{{ reservationData.payment_status.status }}</td>
              <td>{{ reservationData.payment_method.status }}</td>
              <td>¥{{reservationData.total_price }}</td>
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
              <td><TimeStamp :date="reservationData.flight_date" /></td>
              <td>{{ reservationData.flight.flight }}</td>
              <td>{{ reservationData.flight.from }}</td>
              <td>{{ reservationData.flight.departure_time }}</td>
              <td>{{ reservationData.flight.from }}</td>
              <td>{{ reservationData.flight.arrival_time }}</td>
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
              v-for="(passenger, index) in reservationData.passengers"
              :key="passenger"
            >
              <td>{{ index + 1 }}</td>
              <td>
                {{ passenger.first_name }}&nbsp;{{ passenger.last_name }}
              </td>
              <td><TimeStamp :date="passenger.date_of_birth" /></td>
              <td>{{ passenger.gender }}</td>
              <td>¥{{ reservationData.flight.price}}</td>
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
          <tbody v-if="reservationData.user_id !== null">
            <tr>
              <td>
                {{ reservationData.users.first_name }}&nbsp;{{
                  reservationData.users.last_name
                }}
              </td>
              <td>
                <TimeStamp :date="reservationData.users.date_of_birth" />
              </td>
              <td>{{ reservationData.users.gender }}</td>
              <td>{{ reservationData.users.email }}</td>
              <td>{{ reservationData.users.phone }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>
                {{ reservationData.guests.first_name }}&nbsp;{{
                  reservationData.guests.last_name
                }}
              </td>
              <td>
                <TimeStamp :date="reservationData.guests.date_of_birth" />
              </td>
              <td>{{ reservationData.guests.gender }}</td>
              <td>{{ reservationData.guests.email }}</td>
              <td>{{ reservationData.guests.phone }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>
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
</style>
