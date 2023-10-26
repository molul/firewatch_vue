<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavigationButton",
  components: {},
  props: {
    label: null,
  },
});
</script>

<template>
  <div class="p-2 bg-primary rounded">
    <button
      type="button"
      @click="$emit('callback')"
      class="bg-black bg-opacity-20 hover:bg-opacity-40 transition-colors text-white font-bold px-2 py-2 rounded"
    >
      {{ label }}
    </button>
  </div>
</template>
