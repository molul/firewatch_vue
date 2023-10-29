<script lang="ts">
import { defineComponent, ref, PropType } from "vue";

export default defineComponent({
  name: "DropDown",

  props: {
    data: {
      type: Array as PropType<{ value: string; label: string }[]>,
      required: true,
    },
    label: String,
    id: String,
  },

  setup() {
    const selected = ref("");
    return {
      selected,
    };
  },
});
</script>

<template>
  <select
    :id="id"
    v-model="selected"
    @change="$emit('hasChanged', selected)"
    class="p-2 rounded border border-zinc-400 w-full md:w-36 lg:w-40"
  >
    <option disabled value="">{{ label }}</option>
    <option v-for="(item, index) in data" :key="index" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
