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
  <div class="">
    <button
      type="button"
      @click="$emit('callback')"
      class="bg-primary hover:bg-primary-light text-zinc-700 uppercase font-bold p-4 rounded transition-colors"
    >
      {{ label }}
    </button>
  </div>
</template>
