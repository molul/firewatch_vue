<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MapValueInput",

  props: {
    modelValue: Number,
    label: String,
  },
  setup() {},
});
</script>

<template>
  <div class="flex gap-2 items-center">
    <div class="w-20 md:w-auto">{{ label }}</div>
    <div class="w-full md:w-auto">
      <input
        :value="modelValue"
        class="p-2 rounded border border-zinc-400 w-full md:w-20"
        @input="
          $emit(
            'update:modelValue',
            parseFloat(($event.target as HTMLInputElement).value)
          )
        "
      />
    </div>
  </div>
</template>
