<script setup lang="ts">
import { auth } from "../../firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router: any = useRouter();

// beforeRouteEnter(to, from, next) {
//     next(vm => {
//         vm.prevRoute = from
//     })
//   }
// const beforeRouteEnter = async (to, from, next) => {
//   // ログインしていない場合は、ログインページにリダイレクト
//   // if (!isLoggedIn()) {
//   //   next('/login')
//   // } else {
//   //   next()
//   // }

//   next(vm => {
//         vm.prevRoute = from
//         console.log(vm.prevRoute.path)
//     })

//   console.log(to);
//   console.log(from);
//   console.log(next)
// }

// router.beforeEach(beforeRouteEnter);

let referrer = router.referrer;
console.log(referrer.path);

// 入力された値を保持
const user = reactive({ email: "", password: "" });

const loginButton = async () => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        if (referrer.path === "/confirmation") {
          router.push("/passenger");
        } else if (referrer.path === "/referenceForm") {
          router.push("/myPage");
        } else {
          router.push("/");
        }
      }
    );
  } catch (error) {
    alert("メールアドレスまたはパスワードが間違っています");
  }
};
</script>

<template>
  <h1>ログイン</h1>
  <v-form @submit.prevent>
    <!-- メールアドレス： -->
    <!-- <input type="email" v-model="user.email"/> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Email address"
        placeholder="johndoe@gmail.com"
        type="email"
        v-model="user.email"
        hint="登録済みのメールアドレスを入力してください"
      ></v-text-field>
    </v-responsive>
    <!-- パスワード： -->
    <!-- <input type="password" v-model="user.password
    "/> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Password"
        placeholder="john123"
        type="password"
        v-model="user.password"
      ></v-text-field>
    </v-responsive>
    <!-- <button @click="loginButton">ログイン</button> -->
    <v-btn rounded="pill" color="#4682B4" @click="loginButton">ログイン</v-btn>
  </v-form>
</template>
