<script setup lang="ts">
import { auth } from "../../firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();

// 入力された値を保持
const user = reactive({ email: "", password: "" });

const loginButton = async () => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        router.push("/");
      }
    );
  } catch (error) {
    alert("メールアドレスまたはパスワードが間違っています");
  }
};
</script>

<template>
  <h1>ログイン</h1>
  <form @submit.prevent>
    メールアドレス：
    <input type="email" v-model="user.email"/>
    パスワード：
    <input type="password" v-model="user.password
    "/>
    <button @click="loginButton">ログイン</button>
  </form>
</template>
