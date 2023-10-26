<template>
  <h1 class="font-bold text-3xl text-center uppercase my-4">
    {{ text }}
  </h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Title",
  components: {},
  props: {
    text: String,
  },
  setup() {
    onMounted(() => {});
  },
});
</script>

<style></style>
