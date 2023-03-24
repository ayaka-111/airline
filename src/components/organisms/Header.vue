<script setup lang="ts">
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../../../firebase/index";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { computed } from "vue";

const router = useRouter();

const authStore = useAuthStore();
const user = computed(
  () => {
    return authStore.currentUser;
  }
)

const reference = () => {
  router.push("/referenceForm")
}

const signUp = () => {
  router.push("/signUp");
};

const myMenu = () => {
  router.push("/myPage")
}

const login = () => {
  router.push("/signIn");
};
const logout = async () => {
  await signOut(auth);
};
</script>

<template>
  <div>
    <v-app-bar>
      <RouterLink v-bind:to="{ name: 'Top' }" class="appLogoLink">
        <img src="logo.png" class="appLogo">
      </RouterLink>
      <div class="flex-grow-1"></div>
      <div v-if="user === null">
        <v-btn prepend-icon="" @click="reference">予約確認</v-btn>
      <v-btn prepend-icon="mdi-account" @click="signUp">会員登録</v-btn>
      <v-btn prepend-icon="mdi-login" @click="login">ログイン</v-btn>
      </div>
      <div v-else>
      <v-btn prepend-icon="mdi-account" @click="myMenu">マイメニュー</v-btn>
      <v-btn prepend-icon="mdi-logout" @click="logout">ログアウト</v-btn>
    </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.appLogoLink {
  width: 3.5%;
  height: auto;
  display: flex;
  align-items: center;
  margin-left: 5%;
}
.appLogo {
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
}
</style>
