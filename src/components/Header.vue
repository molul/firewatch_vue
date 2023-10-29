<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  name: "Header",
  components: { NavBar },
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row bg-secondary items-center md:items-center shadow-xl p-6 flex-wrap space-y-6 md:space-y-0 md:space-x-4 md:justify-between"
  >
    <div
      class="flex md:flex-row flex-col justify-start items-center md:items-center space-y-4 md:space-y-0 md:space-x-4"
    >
      <div>
        <img
          src="../assets/logo_cesefor.webp"
          alt="logo cesefor"
          class="h-10"
        />
      </div>
      <div class="break-words">
        <h1
          class="text-2xl md:text-2xl lg:text-3xl font-bold text-primary break-words text-center md:text-left"
        >
          PRUEBA LUIS MORCILLO LUQUE
        </h1>
      </div>
    </div>
    <NavBar />
  </div>
</template>
