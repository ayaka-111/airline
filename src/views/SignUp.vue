<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
// import type {User} from "../../types/types";

interface User {
  id: Number;
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

// 入力項目
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const dateOfBirth:Ref<Date | undefined> = ref();
const gender = ref();
// const nationality = ref("");
// const zipCode = ref("");
// const prefecture = ref("");
// const city = ref("");
// const address = ref("");
const phone = ref("");

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  users.value = data;
};

getUsers();

const addUser = async () => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      date_of_birth: dateOfBirth.value,
      gender: gender.value,
      // nationality: nationality.value,
      // zip_code: zipCode.value,
      // prefecture: prefecture.value,
      // city: city.value,
      // address: address.value,
      phone: phone.value,
    }),
  });
  const data = await response.json();
  users.value.push(data);
  // task.value = "";
};

const deleteTask = (id: number) => {
  const index = users.value.findIndex((user) => user.id === id);
  users.value.splice(index, 1);
};
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
      FirstName:
      <input v-model="firstName" />
    </div>
    <div>
      LastName:
      <input v-model="lastName" />
    </div>
    <div>
      Date of birth:
      <input type="date" v-model="dateOfBirth" />
    </div>
    <div>
      Gender:
      <input type="radio" id="male" name="gender" value="male" v-model="gender" />
      <label for="male">Male</label>
      <input type="radio" id="female" name="gender" value="female" v-model="gender" />
      <label for="female">Female</label>
    </div>
    <div>
      Email:
      <input v-model="email" />
    </div>
    <div>
      Phone:
      <input v-model="phone" />
    </div>
    <div>
      <button type="submit">登録</button>
    </div>
  </form>
</template>
