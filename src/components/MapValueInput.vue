<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MapValueInput",

  props: {
    value: Number,
    label: String,
    full: Boolean,
  },
  setup() {},
});
</script>

<template>
  <div
    class="flex gap-2 items-center md:w-auto"
    :class="{ 'w-full': full == true, 'w-1/2': full == false }"
  >
    <div class="w-auto min-w-[60px] text-right">{{ label }}</div>
    <div class="w-full md:w-auto">
      <input
        :value="value"
        class="p-2 rounded border border-zinc-400 w-full md:w-20"
        @input="$emit('callback', $event)"
      />
    </div>
  </div>
</template>
