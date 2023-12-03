<script setup lang="ts">
import NavBar from "./NavBar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const infoVisible = ref(false);
const showInfo = () => {
  infoVisible.value = !infoVisible.value;
};
const closeInfo = () => {
  infoVisible.value = false;
};
</script>

<template>
  <div class="sticky top-0 z-50">
    <div
      class="flex flex-row bg-secondary items-center shadow-xl p-3 flex-wrap space-x-2 justify-between"
    >
      <div class="break-words">
        <h1
          class="text-3xl md:text-4xl font-bold text-primary break-words text-center md:text-left"
        >
          FIREWATCH
        </h1>
      </div>
      <div class="flex flex-row items-center space-x-6 cursor-pointer">
        <div @click="showInfo">
          <Icon
            icon="bi:info-circle-fill"
            width="40"
            class="text-primary hover:text-primary-light transition-colors rounded-full"
          />
        </div>
        <NavBar />
      </div>
    </div>
    <div
      v-if="infoVisible"
      class="fixed left-0 top-0 bg-black bg-opacity-90 w-full h-full z-50 flex items-center justify-center p-4"
    >
      <div class="relative bg-white bg-opacity-90 p-8 rounded max-w-2xl">
        <div class="absolute top-2 right-2 cursor-pointer" @click="closeInfo">
          <Icon
            icon="mdi:close-box"
            width="38"
            class="text-red-600 rounded-full p-0.5"
          />
        </div>
        <div class="text-xs md:text-base">
          Esta aplicación sirve para monitorizar en tiempo real los incendios
          reportados en la comunidad de Castilla y León a través de los datos
          registrados en
          <a
            href="https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/console"
            target="_blank"
            class="underline"
            >https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/console</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
