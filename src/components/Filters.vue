<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown from "../components/Dropdown.vue";
import { provinces } from "../data/provinces";
import { situations } from "../data/situations";

export default defineComponent({
  name: "Filters",
  components: { Dropdown },
  setup() {
    const selectedProvince = ref("");
    const selectedCurrentSituation = ref("");
    // const reloadRecords = (field: string, value: string) => {
    //   console.log(field, value);
    // };
    return {
      selectedProvince,
      provinces,
      selectedCurrentSituation,
      situations,
    };
  },
});
</script>

<template>
  <div class="flex gap-2 items-center">
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
  </div>
</template>
