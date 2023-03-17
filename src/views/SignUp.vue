<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useAuthStore } from "../stores/auth";
// import type {User} from "../../types/types";

interface User {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  // nationality: String;
  // zip_code: String;
  // prefecture: String;
  // city: String;
  // address: String;
  phone: String;
}

// let id = 0;

const users: Ref<User[]> = ref([]);

// 入力された値を保持
let userData: {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
} = reactive({
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  password: "",
  confirmPassword: "",
});
// const email = ref("");
// const firstName = ref("");
// const lastName = ref("");
// const dateOfBirth= ref();
// const gender = ref();

// const nationality = ref("");
// const zipCode = ref("");
// const prefecture = ref("");
// const city = ref("");
// const address = ref("");

// const phone = ref("");
// const password = ref("");

const router = useRouter();

// const getUsers = async () => {
//   const response = await fetch("http://localhost:3000/users");
//   const data = await response.json();
//   users.value = data;
// };

// getUsers();

// ログイン状態の処理をここに書く(もしログイン状態でこの画面を開かれたらMyPageに遷移する。しかし、注文中に開かれた場合は注文確認の画面に遷移する)
// const authStore = useAuthStore();
// const currentUser = computed(():string => {
//       return authStore.uid;
//     });

//     console.log(currentUser);

// firebaseの会員登録も追加する
const addUser = async () => {
  try {
    // Authenticationに登録
    createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    ).then(async() => {
      const currentUserId: string | undefined = auth.currentUser?.uid

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUserId,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          date_of_birth: new Date(userData.dateOfBirth),
          gender: userData.gender,
          // nationality: nationality.value,
          // zip_code: zipCode.value,
          // prefecture: prefecture.value,
          // city: city.value,
          // address: address.value,
          phone: userData.phone,
        }),
      })
      // .then(()=>{
      const data = await response.json();
      users.value.push(data);

      // task.value = "";
      // })
      // router.push({ name: "myPage", query: { email: userData.email } });
    // })
      router.push("/myPage");
    });
  } catch (error) {
    console.log(error);
  }
};

// const deleteTask = (id: number) => {
//   const index = users.value.findIndex((user) => user.id === id);
//   users.value.splice(index, 1);
// };
</script>

<template>
  <h1>会員登録</h1>
  <ul>
    <!-- <li v-for="user in users" :key="user.id"> -->
    <!-- :style="user.completed ? 'text-decoration:line-through' : ''" -->
    <!-- <span><input type="checkbox" v-model="user.completed" /></span> -->
    <!-- <span>{{ task.task }}</span> -->
    <!-- <span>{{ user.first_name }}{{ user.last_name }}</span> -->
    <!-- <button @click="deleteTask(user.id)">削除</button> -->
    <!-- </li> -->
  </ul>
  <form @submit.prevent="addUser">
    <div>
      <label for="firstName">FirstName:</label>
      <input type="text" v-model="userData.firstName" />
    </div>
    <div>
      <label for="lastName">LastName:</label>
      <input type="text" v-model="userData.lastName" />
    </div>
    <div>
      <p>日付{{ new Date(userData.dateOfBirth).toLocaleString() }}</p>
      <label for="dateOfBirth">Date of birth:</label>
      <input type="date" v-model="userData.dateOfBirth" />
    </div>
    <div>
      Gender:
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        v-model="userData.gender"
      />
      <label for="male">Male</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        v-model="userData.gender"
      />
      <label for="female">Female</label>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="text" v-model="userData.email" />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input type="text" v-model="userData.phone" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="userData.password" />
    </div>
    <div>
      <label for="confirmPassword">confirmPassword:</label>
      <input type="confirmPassword" v-model="userData.confirmPassword" />
    </div>
    <div>
      <button type="submit">登録</button>
    </div>
  </form>
</template>
