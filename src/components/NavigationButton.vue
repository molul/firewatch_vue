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
      class="bg-primary hover:bg-primary-light hover:shadow-lg text-secondary uppercase font-extrabold p-1 rounded transition-colors w-12"
    >
      {{ label }}
    </button>
  </div>
</template>
