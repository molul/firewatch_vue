<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  name: "Header",
  components: { NavBar },
};
</script>

<template>
  <div
    class="flex justify-between bg-secondary items-center shadow-xl px-4 py-4 flex-wrap"
  >
    <div class="flex space-x-8 items-center flex-wrap">
      <img src="../assets/logo_cesefor.webp" alt="logo cesefor" class="h-10" />
      <h1 class="text-3xl font-bold text-white py-4">
        PRUEBA LUIS MORCILLO LUQUE
      </h1>
    </div>
  </div>
</template>
