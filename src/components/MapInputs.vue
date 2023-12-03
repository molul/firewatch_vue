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
  <div
    class="p-4 flex flex-col gap-4 justify-center border border-zinc-400 rounded bg-zinc-100 my-4"
  >
    <div class="text-center uppercase font-bold text-xl">Área</div>
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <MapValueInput
        :full="true"
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
      <div class="flex flex-row space-x-3">
        <MapValueInput
          :full="false"
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
          :full="false"
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
    </div>
  </div>
</template>
