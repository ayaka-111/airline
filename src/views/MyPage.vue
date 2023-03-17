<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "../stores/auth";

interface User {
  id: Number;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

const user: Ref<User | undefined> = ref();

  const authStore =useAuthStore();

const currentUser = computed(
  ()=>{
    return authStore.uid;
  }
)

// ログイン認証して自分のidを指定する
const getUser = async () => {
  const response = await fetch(`http://localhost:3000/users/${currentUser}`);
  const data = await response.json();
  user.value = data;
};

getUser();
// console.log(authStore.currentUser?.uid);

</script>

<template>
  <h1>マイページ</h1>
  <p>{{ currentUser }}</p>
  <div>{{ user?.first_name }}</div>
</template>
