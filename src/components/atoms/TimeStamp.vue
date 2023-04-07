<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "TimeStamp",
  props: {
    date: String,
  },
  setup: (props) => {
    const timestamp = reactive({
      year: "",
      month: "",
      date: "",
    });
    const date: any = new Date(props.date as any);
    timestamp.year = date.getFullYear();
    timestamp.month = date.getMonth() + 1;
    timestamp.date = date.getDate();

    return { timestamp };
  },
});
</script>

<template>
  {{ timestamp.year }}/{{ timestamp.month }}/{{ timestamp.date }}
</template>
