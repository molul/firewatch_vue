<script lang="ts">
import { defineComponent, computed } from "vue";
import { GoogleMap, CustomMarker, Circle } from "vue3-google-map";
import { Position } from "../composables/fetchData";

export default defineComponent({
  name: "GoogleMapComp",
  components: { GoogleMap, Circle, CustomMarker },
  props: {
    circle: Object as () => google.maps.CircleOptions,
    markers: Array<Position>,
    center: Object as () => google.maps.LatLng | google.maps.LatLngLiteral,
    radiusKm: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const circle = computed(() => {
      return {
        center: props.center,
        radius: props.radiusKm * 1000,
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
    qwe
    <GoogleMap
      :api-key="googleMapsKey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="6.5"
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
        <div style="text-align: center" class="">
          <img
            src="../assets/fire.png"
            width="25"
            height="25"
            style="margin-top: 0px"
          />
        </div>
      </CustomMarker>
    </GoogleMap>
  </div>
</template>
