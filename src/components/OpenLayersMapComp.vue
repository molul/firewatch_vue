<script lang="ts">
import { defineComponent, computed } from "vue";
import { Position } from "../composables/fetchData";
import FireMarker from "./FireMarker.vue";

export default defineComponent({
  name: "OpenLayersMapComp",
  components: { FireMarker },
  props: {
    markers: Array<Position>,
    center: {
      type: Object as () => Position,
      required: true,
    },
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

    const radiusDeg = computed(() => {
      const earthRadiusInKm = 6371; // Radius of the Earth in kilometers
      const degreesPerRadian = 180.0 / Math.PI;

      // Calculate the angular distance in radians
      const angularDistance = props.radiusKm / earthRadiusInKm;

      // Convert latitude from degrees to radians
      const latitudeInRadians = props.center.lat / degreesPerRadian;

      // Calculate the corresponding change in longitude
      const deltaLongitude = angularDistance * degreesPerRadian;

      const ret = deltaLongitude / Math.cos(latitudeInRadians);

      return ret;
    });

    return { circle, radiusDeg };
  },
});
</script>

<template>
  <div class="py-4">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 600px"
    >
      <ol-view
        ref="view"
        :center="[center?.lng, center?.lat]"
        :rotation="0"
        :zoom="7"
        projection="EPSG:4326"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-overlay
        :position="[item.lng, item.lat]"
        v-for="(item, index) in markers"
        :key="index"
      >
        <div class="overlay-content">
          <FireMarker />
        </div>
      </ol-overlay>

      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-circle
              :center="[center?.lng, center?.lat]"
              :radius="radiusDeg"
            ></ol-geom-circle>
            <ol-style>
              <ol-style-stroke color="red" :width="3"></ol-style-stroke>
              <ol-style-fill color="rgba(255,0,0,0.2)"></ol-style-fill>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </div>
</template>
