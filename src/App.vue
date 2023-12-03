<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  name: "App",
  components: { Header, Footer },
});
</script>

<template>
  <div class="font-main">
    <Header />
    <div class="bg-zinc-200 py-4">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
