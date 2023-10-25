<template>
  <button
    type="button"
    @click="$emit('callback')"
    class="bg-sky-700 hover:bg-sky-600 transition-colors text-white px-4 py-2 rounded"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
export default {
  name: "NavigationButton",
  components: {},
  props: {
    label: "",
  },
};
</script>

<style></style>
