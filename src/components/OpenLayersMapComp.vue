<script lang="ts">
import { defineComponent, computed } from "vue";
import { Position } from "../composables/fetchData";
import FireMarker from "./FireMarker.vue";

export default defineComponent({
  name: "OpenLayersMapComp",
  components: { FireMarker },
  props: {
    markers: Array<Position>,
    center: Object as () => Position,
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

    return { circle };
  },
});
</script>

<template>
  <div class="py-4">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px"
    >
      <ol-view
        ref="view"
        :center="[center?.lng, center?.lat]"
        :rotation="0"
        :zoom="5"
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
    </ol-map>
  </div>
</template>
