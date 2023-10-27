<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: { Header },
});
</script>

<template>
  <Header />
  <div class="bg-zinc-200 py-4">
    <router-view />
  </div>
</template>
