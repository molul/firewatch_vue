<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    text: String,
  },
});
</script>

<template>
  <h1 class="font-bold text-3xl text-center uppercase my-4 text-black">
    {{ text }}
  </h1>
</template>
