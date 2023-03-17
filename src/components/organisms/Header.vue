<script setup lang="ts">
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '../../../firebase/index';

const router = useRouter();

const signUp = () => {
  router.push("/signUp")
}

const login = () => {
  router.push("/signIn")
}
const logout = async() => {
  await signOut(auth);
}
</script>

<template>
  <button @click="signUp">会員登録</button>
  <button @click="login">ログイン</button>
  <button @click="logout">ログアウト</button>
</template>
