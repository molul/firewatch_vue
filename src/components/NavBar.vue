<template>
  <nav>
    <div class="flex justify-center">
      <div class="flex bg-primary rounded-md p-2 space-x-1">
        <div
          class="text-white bg-black bg-opacity-0 hover:bg-opacity-20 transition duration-200 overflow-hidden"
          v-for="(item, index) in navigationItems"
          :key="index"
          :class="{
            'rounded-l': index === 0,
            'rounded-r': index === navigationItems.length - 1,
          }"
        >
          <router-link
            class="bg-black bg-opacity-20 block font-bold uppercase font-condensed text-md md:text-md lg:text-2xl px-4 py-2"
            :to="item.link"
            >{{ item.label }}</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: "NavBar",
  data() {
    return {
      navigationItems: [
        { label: "Incendios", link: "/" },
        { label: "Mapa", link: "/mapa" },
      ],
    };
  },
};
</script>

<style></style>
