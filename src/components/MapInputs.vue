<script lang="ts">
import { defineComponent } from "vue";
import MapValueInput from "./MapValueInput.vue";

export default defineComponent({
  name: "MapInputs",
  components: { MapValueInput },

  props: {
    radiusKm: Number,
    longitud: Number,
    latitud: Number,
  },

  setup() {},
});
</script>

<template>
  <div class="p-4 flex flex-col md:flex-row gap-4 justify-center">
    <MapValueInput
      label="Radio"
      :value="radiusKm"
      @callback="
        (event) =>
          $emit('callback', {
            name: 'radiusKm',
            value: parseFloat(event.target.value),
          })
      "
    />
    <MapValueInput
      label="Longitud"
      :value="longitud"
      @callback="
        (event) =>
          $emit('callback', {
            name: 'longitud',
            value: parseFloat(event.target.value),
          })
      "
    />
    <MapValueInput
      label="Latitud"
      :value="latitud"
      @callback="
        (event) =>
          $emit('callback', {
            name: 'latitud',
            value: parseFloat(event.target.value),
          })
      "
    />
  </div>
</template>
