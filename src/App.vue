<script setup lang="ts">
// import { ref } from 'vue';
// import type {Ref} from "vue";
import { RouterView } from "vue-router";

import { useAuthStore } from "./stores/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/index";
import Header from "./components/organisms/Header.vue";
import { computed } from "vue";
// import { useReservationStore } from "./stores/reservation";

// let id = 0;

// const tasks:Ref<{ id:number, task: string, completed: boolean }[]> = ref([]);
// const task = ref('');

// const getTasks = async () => {
//   const response = await fetch("http://localhost:3000/tasks");
//   const data = await response.json();
//   tasks.value = data;
// };

// getTasks();

// const addTask = async () => {
//   const response = await fetch('http://localhost:3000/tasks', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ task: task.value, completed: false }),
//   });
//   const data = await response.json();
//   tasks.value.push(data);
//   task.value = '';
// };

// const deleteTask = (id:number) => {
//   const index = tasks.value.findIndex((task) => task.id === id);
//   tasks.value.splice(index, 1);
// };

// import { supabase } from '../supabase';
// import { useAuthStore } from './stores/auth';
// const auth = useAuthStore();

// auth.setUser(supabase.auth.user());

// supabase.auth.onAuthStateChange((event, session) => {
//   if (event == 'SIGNED_IN') auth.setUser(session.user);
//   if (event == 'SIGNED_OUT') auth.clearUser();
// });

// store呼び出し
const authStore = useAuthStore();
// console.log(authStore.currentUser.auth.uid);

// authStore.setUser(getAuth());

// サインインとサインアウトのイベントを監視する
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    authStore.setUser(currentUser);
    // computed(() => {
    //   return authStore.getUid(currentUser.uid);
    // });
    // uidをpiniaで管理
    authStore.getUid(currentUser.uid);
    console.log(`ログイン状態`);

    // ログインユーザー情報をdbから取得しpiniaで管理
    authStore.getUserData(currentUser.uid);
  } else {
    authStore.clearUser();
    console.log("ログアウト状態");
  }
});
</script>

<template>
  <v-app>
    <Header></Header>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
