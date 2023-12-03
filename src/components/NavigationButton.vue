<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps(["label", "icon"]);
</script>

<template>
  <div class="">
    <button
      type="button"
      @click="$emit('callback')"
      class="bg-primary hover:bg-primary-light hover:shadow-lg text-secondary uppercase font-extrabold p-1 rounded transition-colors w-12 h-8 flex items-center justify-center shadow-md"
    >
      <Icon v-if="icon" :icon="icon" width="28" />
      <div v-if="label">{{ label }}</div>
    </button>
  </div>
</template>
