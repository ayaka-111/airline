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

const router = useRouter();

// const getUsers = async () => {
//   const response = await fetch("http://localhost:3000/users");
//   const data = await response.json();
//   users.value = data;
// };

// getUsers();

// firebaseの会員登録も追加する
const addUser = async () => {
  try {
    // Authenticationに登録
    createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    ).then(async () => {
      const currentUserId: string | undefined = auth.currentUser?.uid;

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
      });
      const data = await response.json();
      users.value.push(data);
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
  <v-form @submit.prevent="addUser">
    <!-- <div>
      <label for="firstName">FirstName:</label>
      <input type="text" v-model="userData.firstName" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="First Name"
        placeholder="John"
        type="text"
        v-model="userData.firstName"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <!-- <div>
      <label for="lastName">LastName:</label>
      <input type="text" v-model="userData.lastName" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Last Name"
        placeholder="Smith"
        type="text"
        v-model="userData.lastName"
        hint="パスポート記載のとおり入力してください"
      ></v-text-field>
    </v-responsive>
    <!-- <div>
      <p>日付{{ new Date(userData.dateOfBirth).toLocaleString() }}</p>
      <label for="dateOfBirth">Date of birth:</label>
      <input type="date" v-model="userData.dateOfBirth" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Birth of Date"
        type="date"
        v-model="userData.dateOfBirth"
      ></v-text-field>
    </v-responsive>
    <v-responsive class="mx-auto" max-width="344">
      <v-radio-group inline>
        <v-radio label="Male" value="male" name="gender"  v-model="userData.gender"></v-radio>
        <v-radio label="Female" value="female" name="gender"  v-model="userData.gender"></v-radio>
      </v-radio-group>
    </v-responsive>
    <!-- <div>
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
    </div> -->
    <!-- <div>
      <label for="email">Email:</label>
      <input type="text" v-model="userData.email" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Email address"
        placeholder="johndoe@gmail.com"
        type="email"
        v-model="userData.email"
      ></v-text-field>
    </v-responsive>
    <!-- <div>
      <label for="phone">Phone:</label>
      <input type="text" v-model="userData.phone" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Phone"
        placeholder="09012345678"
        type="text"
        v-model="userData.phone"
        hint="ハイフン不要"
      ></v-text-field>
    </v-responsive>
    <!-- <div>
      <label for="password">Password:</label>
      <input type="password" v-model="userData.password" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Password"
        placeholder="john123"
        type="password"
        v-model="userData.password"
        hint="半角英数字8文字以上20文字以下"
      ></v-text-field>
    </v-responsive>
    <!-- <div>
      <label for="confirmPassword">confirmPassword:</label>
      <input type="confirmPassword" v-model="userData.confirmPassword" />
    </div> -->
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Confirm Password"
        placeholder="john123"
        type="password"
        v-model="userData.confirmPassword"
        hint="確認のためもう一度入力してください"
      ></v-text-field>
    </v-responsive>
    <div>
      <v-btn rounded="pill" color="#4682B4" type="submit">登録</v-btn>
    </div>
  </v-form>
</template>
