<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

// myPageから便名受け取る
const route = useRoute();
const id = route.params.id;
console.log(id);

const reservationData = ref();
const loading = ref(true);

// reservationsからidを指定して取得
const getReservation = async () => {
  const response = await fetch(`http://localhost:3000/joinReservations/?id=${id}`);
  const data = await response.json();
  reservationData.value = data;
  loading.value= false;
  console.log(data);
};

getReservation();
console.log(reservationData.value)
</script>

<template>
  <h1>詳細</h1>
  <template v-if="loading">
    <p>loading...</p>
    </template>
    <template v-else>
  <p>{{ reservationData[0].users.first_name }}</p>
</template>
</template>
