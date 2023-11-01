<script lang="ts">
export default {
  name: "ModeSwitch",
  setup() {
    const navigationItems = [
      { label: "Mapa", link: "/" },
      { label: "Tabla", link: "tabla" },
    ];

    return { navigationItems };
  },
};
</script>

<template>
  <nav>
    <div class="flex justify-center">
      <div class="flex bg-primary rounded-md p-2 text-sm md:text-base">
        <div
          class="hover:bg-opacity-20 transition duration-200 overflow-hidden"
          v-for="(item, index) in navigationItems"
          :key="index"
          :class="{
            'rounded-l': index === 0,
            'rounded-r': index === navigationItems.length - 1,
          }"
        >
          <router-link
            active-class="bg-opacity-30"
            class="bg-white text-secondary bg-opacity-0 block font-bold uppercase font-condensed px-2 py-2 hover:bg-opacity-20 transition-colors"
            :to="item.link"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
