<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  name: "Header",
  components: { NavBar },
};
</script>

<template>
  <div
    class="flex flex-col bg-secondary items-start shadow-xl px-4 py-4 flex-wrap"
  >
    <div class="flex flex-col justify-start items-start">
      <div>
        <img
          src="../assets/logo_cesefor.webp"
          alt="logo cesefor"
          class="h-10"
        />
      </div>
      <div class="break-words">
        <h1 class="text-xl font-bold text-primary break-words">
          PRUEBA LUIS MORCILLO LUQUE
        </h1>
      </div>
    </div>
    <NavBar />
  </div>
</template>
