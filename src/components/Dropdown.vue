<script lang="ts">
import { defineComponent, ref } from "vue";
import { provinces } from "../data/provinces";

export default defineComponent({
  name: "DropDown",
  setup() {
    const selected = ref("");

    return { selected, provinces };

    return {
      selected,
    };
  },
});
</script>

<template>
  <!-- <span> Provincia: {{ selected }}</span> -->

  <select v-model="selected" class="p-2 rounded border border-zinc-400">
    <option disabled value="">Provincia</option>
    <option
      v-for="(province, index) in provinces"
      :key="index"
      :value="province.value"
      @change="$emit('callback')"
    >
      {{ province.label }}
    </option>
  </select>
</template>
