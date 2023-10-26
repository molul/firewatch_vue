<template>
  <div
    class="flex justify-between bg-secondary items-center shadow-xl px-4 py-4"
  >
    <div class="flex space-x-4 items-center">
      <img src="../assets/logo_cesefor.webp" alt="logo cesefor" class="h-10" />
      <h1 class="text-3xl font-bold text-white py-4">
        PRUEBA LUIS MORCILLO LUQUE
      </h1>
    </div>
    <NavBar />
  </div>
</template>

<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  name: "Header",
  components: { NavBar },
};
</script>

<style></style>
