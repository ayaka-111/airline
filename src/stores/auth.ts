import { defineStore } from "pinia";
import { getAuth, signInWithPopup } from "@firebase/auth";

interface User {
  id: String;
  email: String;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  gender: String;
  phone: String;
}

// const auth = getAuth();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // user: null,
    currentUser: null as User | null | any,
    uid: "",
    userData: [] as User[],
  }),
  getters: {
    //ログインしているかどうか判断
    // isLoggedIn: (state) => state.currentUser !== null,
    isLoggedIn: (state) => state.currentUser,
    // getUid: uid
  },
  actions: {
    // async signIn() {
    //   try {
    //     const res = await signInWithPopup(auth, provider)
    //   }
    // }
    // サインインした場合
    setUser(user: any) {
      this.currentUser = user;
    },
    // サインアウトした場合
    clearUser() {
      this.currentUser = null;
    },
    getUid(userId: any) {
      this.uid = userId;
    },
    async getUserData(id: string) {
      const response = await fetch(`http://localhost:3000/users/${id}`);
      const data = await response.json();
      this.userData = data;
    },
  },
});
