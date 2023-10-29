<script lang="ts">
import { defineComponent, computed } from "vue";
import { GoogleMap, CustomMarker, Circle } from "vue3-google-map";
import { Position } from "../composables/fetchData";
import FireMarker from "./FireMarker.vue";

export default defineComponent({
  name: "GoogleMapComp",
  components: { GoogleMap, Circle, CustomMarker, FireMarker },
  props: {
    circle: Object as () => google.maps.CircleOptions,
    markers: Array<Position>,
    center: Object as () => google.maps.LatLng | google.maps.LatLngLiteral,
    radiusKm: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const circle = computed(() => {
      return {
        center: props.center,
        radius: parseFloat(props.radiusKm) * 1000,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      };
    });

    const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return { googleMapsKey, circle };
  },
});
</script>

<template>
  <div class="py-2">
    <GoogleMap
      :api-key="googleMapsKey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="7"
    >
      <Circle :options="circle" />

      <CustomMarker
        v-for="(item, index) in markers"
        :key="index"
        :options="{
          position: item,
          anchorPoint: 'BOTTOM_CENTER',
        }"
      >
        <FireMarker />
      </CustomMarker>
    </GoogleMap>
  </div>
</template>
