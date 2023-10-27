<script lang="ts">
export default {
  name: "NavBar",
  props: {
    current: String,
  },
  setup() {
    // const navigationItems = [
    //   { label: "Incendios", link: "/" },
    //   { label: "Mapa", link: "/mapa" },
    // ];
    const navigationItems = [
      { label: "Tabla", value: "table" },
      { label: "Mapa", value: "map" },
    ];

    return { navigationItems };
  },
};
</script>

<template>
  <nav>
    <div class="flex justify-center my-8">
      <div class="flex bg-primary rounded-md p-2 space-x-1">
        <div
          class="text-white bg-white bg-opacity-0 hover:bg-opacity-20 transition duration-200 overflow-hidden"
          v-for="(item, index) in navigationItems"
          :key="index"
          :class="{
            'rounded-l': index === 0,
            'rounded-r': index === navigationItems.length - 1,
          }"
        >
          <button
            class="bg-white block font-bold uppercase font-condensed px-4 py-2"
            :class="{
              'bg-opacity-0': item.value != current,
              'bg-opacity-30 text-zinc-800': item.value === current,
            }"
            @click="$emit('callback', item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
