<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "../../../stores/booking";

// interface Props {
//   flight: string,
//   date: string,
//   passenger: string,
//   price: number,
// };

// // v-forの中から便名・queryの中から日付・人数受け取る
// const props = defineProps<Props>();

// const router = useRouter();

// //選択内容を保存するPiniaを呼び出す
// const bookingStore = useBookingStore();

// // 便を選択してpiniaに保存する
// const selectedBtn = () => {
//   // 便名・人数・日付
//   bookingStore.selectedFlight(props.flight)
//   bookingStore.selectedDate(props.date)
//   bookingStore.selectedPassengerNum(props.passenger)
//   // 確認画面に遷移する
//   router.push("/confirmation");
// };

export default defineComponent({
  name: "SelectedBtn",
  props: {
    flight_id: Number,
    flight: String,
    date: String,
    passenger: String,
    price: Number,
  },
  setup: (props) => {
    //オブジェクトの形で渡される
    // const postIdObj = defineProps(["postId"]);
    const router = useRouter();

    const bookingStore = useBookingStore();

    const selectedBtn = () => {
      // id・便名・人数・日付
      // (bookingStore as any).selectedFlightId(props.flight_id);
      // (bookingStore as any).selectedFlight(props.flight);
      (bookingStore as any).selectedDate(props.date);
      (bookingStore as any).selectedPassengerNum(props.passenger);
      (bookingStore as any).getFlight(props.flight_id);

      // 確認画面に遷移する
      router.push("/confirmation");
    };
    return { selectedBtn };
  },
});
</script>

<template>
  <!-- 満席の場合予約できないようにする -->
  <v-btn @click="selectedBtn" class="btn" size="x-large"><span class="font-weight-bold btnText">¥{{ price?.toLocaleString() }}</span></v-btn>
</template>

<style scoped>
.btn {
  background-color: #3498db;
  color: #ffff;
  /* width: 15%;
  padding: 3.5%; */
}
.btnText {
  align-items: center;
  /* font-size: 1.2rem; */
}
</style>
