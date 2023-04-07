<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const myPageBtn = () => {
  router.push("/myPage");
};
const guestReferenceFormBtn = () => {
  router.push("/referenceForm");
};
</script>

<template>
  <div class="text-h5 text-center">ご予約完了</div>

<div class="text-center mt-5 referenceContents">
  <p><v-icon icon="mdi-arrow-down-bold-outline"></v-icon>ご予約内容の確認はこちらから</p>
  <div class="d-flex btnContents justify-center mt-5">
  <v-btn @click="myPageBtn" color="#3498db"><span class="btnText">会員の方</span></v-btn>
  <v-btn @click="guestReferenceFormBtn" color="#3498db"><span class="btnText">会員登録していない方</span></v-btn>
</div>
</div>
</template>

<style scoped>
.referenceContents {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1%;
}
.btnContents {
  gap:10%;
}
.btnText {
  font-weight: bold;
  color: #ffff;
}
</style>
