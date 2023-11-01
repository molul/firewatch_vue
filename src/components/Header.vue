<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  name: "Header",
  components: { NavBar },
};
</script>

<template>
  <div
    class="flex flex-row bg-secondary items-center shadow-xl p-4 flex-wrap space-x-2 justify-between"
  >
    <div class="break-words">
      <h1
        class="text-2xl md:text-2xl lg:text-3xl font-bold text-primary break-words text-center md:text-left"
      >
        FIREWATCH
      </h1>
    </div>
    <NavBar />
  </div>
</template>
