<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown from "../components/Dropdown.vue";
import { provinces } from "../data/provinces";
import { situations } from "../data/situations";
import { levels } from "../data/levels";
import { causes } from "../data/causes";

export default defineComponent({
  name: "Filters",
  components: { Dropdown },
  setup() {
    const selectedProvince = ref("");
    const selectedCurrentSituation = ref("");
    const selectedLevel = ref("");
    const selectedCause = ref("");

    return {
      selectedProvince,
      provinces,
      selectedCurrentSituation,
      situations,
      levels,
      selectedLevel,
      causes,
      selectedCause,
    };
  },
});
</script>

<template>
  <div class="flex gap-2 items-center justify-center flex-wrap">
    <div>Filtros:</div>
    <!-- <span> Provincia: {{ selected }}</span> -->
    <Dropdown
      :selected="{ selectedProvince }"
      :data="provinces"
      label="Provincia"
      @hasChanged="
        (value) => $emit('callback', { field: 'provincia', value: value })
      "
    />

    <Dropdown
      :selected="{ selectedCurrentSituation }"
      :data="situations"
      label="Situación"
      @hasChanged="
        (value) =>
          $emit('callback', { field: 'situacion_actual', value: value })
      "
    />

    <Dropdown
      :selected="{ selectedLevel }"
      :data="levels"
      label="Nivel máximo"
      @hasChanged="
        (value) =>
          $emit('callback', { field: 'nivel_maximo_alcanzado', value: value })
      "
    />

    <Dropdown
      :selected="{ selectedCause }"
      :data="causes"
      label="Causa probable"
      @hasChanged="
        (value) => $emit('callback', { field: 'causa_probable', value: value })
      "
    />
  </div>
</template>
