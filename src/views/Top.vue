<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

// この2つを検索結果に引き継ぐ
// 入力された日付と人数を保持
const date = ref();
const numberOfPeople: Ref<number> = ref(0);

// 人数プラスボタン
const peoplePlusBtn = () => {
  if (numberOfPeople.value < 20) {
    numberOfPeople.value++;
  }
};
// 人数マイナスボタン
const peopleMinusBtn = () => {
  if (numberOfPeople.value > 0) {
    numberOfPeople.value--;
  }
};
// 検索ボタン
const search = () => {
  console.log("検索！");
};
</script>

<template>
  <div class="carousel">
    <v-carousel cycle>
      <v-carousel-item src="airport.png" cover></v-carousel-item>

      <v-carousel-item
        src="https://www.ana.co.jp/japan-travel-planner/okinawa/img/hero.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item src="churaumi.jpeg" cover></v-carousel-item>
    </v-carousel>
  </div>

  <div class="searchContent">
    <div class="searchItems">
      <div class="searchText">
        <p class="searchTitle">出発地</p>
        <p>
          <v-icon
            icon="mdi-airplane-takeoff"
            color="#3498db"
            class="airplane-icon"
          ></v-icon
          >羽田
        </p>
      </div>
      <v-icon
        icon="mdi-arrow-right-thick"
        size="x-large"
        color="#3498db"
      ></v-icon>
      <div class="searchText">
        <p class="searchTitle">到着地</p>
        <p>
          <v-icon
            icon="mdi-airplane-landing"
            color="#3498db"
            class="airplane-icon"
          ></v-icon
          >那覇
        </p>
      </div>
      <v-responsive max-width="180">
        <div class="peopleField">
          <p>人数</p>
          <div class="peopleForm">
            <v-btn
              icon="mdi-minus-circle-outline"
              variant="text"
              @click="peopleMinusBtn"
            ></v-btn>
            <p class="numberOfPeople">{{ numberOfPeople }}</p>
            <v-btn
              icon="mdi-plus-circle-outline"
              variant="text"
              @click="peoplePlusBtn"
            ></v-btn>
          </div>
        </div>
      </v-responsive>
      <v-responsive max-width="200">
        <v-text-field
          hide-details="auto"
          type="date"
          variant="outlined"
          v-model="date"
          class="date"
        ></v-text-field>
      </v-responsive>
    </div>
    <v-btn prepend-icon="mdi-magnify" class="searchBtn" @click="search">検索する</v-btn>
  </div>
</template>

<style scoped>
.carousel {
  width: 1000px;
  margin: 0 auto;
}
.searchContent {
  width: 900px;
  margin: 5% auto;
  text-align: center;
}
.searchItems {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.searchText {
  width: 20%;
  border: 1px solid #3498db;
  padding: 5px;
  border-radius: 4%;
}
.searchTitle {
  color: #3498db;
}
.airplane-icon {
  margin-right: 10%;
}
.peopleField {
  border: 1px solid #3498db;
  color: #3498db;
  border-radius: 4%;
}
.peopleForm {
  display: flex;
  align-items: center;
  justify-content: center;
}
.numberOfPeople {
  color: black;
}
.counterBtn {
  width: 10px;
  height: 10px;
}
.date {
  color: #3498db;
  padding: 10px;
}
.searchBtn {
  background-color: #3498db;
  color: #ffff;
  font-weight: bold;
  margin-top: 5%;
  width: 50%;
}
</style>
