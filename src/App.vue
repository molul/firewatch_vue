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
  <router-view />
</template>
