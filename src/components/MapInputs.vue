<script lang="ts">
import { defineComponent } from "vue";
import MapValueInput from "./MapValueInput.vue";

export default defineComponent({
  name: "MapInputs",
  components: { MapValueInput },

  props: {
    radiusKm: Number,
    longitud: Number,
  },

  setup(props) {
    const localRadius = props.radiusKm;
    console.log(localRadius);
    const localLong = props.longitud;
    return { localRadius, localLong };
  },
});
</script>

<template>
  <div class="p-4 flex flex-col md:flex-row gap-4 justify-center">
    <MapValueInput
      label="Radio"
      :value="localRadius"
      @input="$emit('callback', $event)"
    />
    <!-- <MapValueInput label="Long" v-model="localLong" /> -->
    <!-- <MapValueInput
      label="Longitud"
      v-model="longitud"
      @input="(value) => $emit('update:longitud', value)"
    />
    <MapValueInput
      label="Latitud"
      v-model="latitud"
      @input="(value) => $emit('update:latitud', value)"
    /> -->
  </div>
</template>
