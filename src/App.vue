<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, ref, computed, onMounted, toRaw } from "vue";
import Header from "./components/Header.vue";
import DataTable from "./components/DataTable.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import { getFields, getRecords } from "./composables/fetchData";
import { Loader } from "@googlemaps/js-api-loader";

export default defineComponent({
  name: "App",
  components: { Header, DataTable, NavigationButtons },
  setup() {
    const data = null;
    const page = ref(1);
    const limit = 50;

    const { fields, fieldsError, loadFields } = getFields();
    const { records, totalCount, numPages, recordsError, loadRecords } =
      getRecords();

    loadFields();
    loadRecords(1, limit);

    const currPos = computed(() => ({
      lat: 40.31,
      lng: -3.48,
    }));

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });
    const mapDiv = ref(null);
    let map = ref(null);

    // let map = ref(null);
    onMounted(async () => {
      await loader.load();
      // @ts-ignore
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 6,
      });

      const firePositions = toRaw(records.value) as any;
      const fires = [];

      if (firePositions && firePositions) {
        for (let i = 0; i < firePositions.length; i++) {
          const firePos = firePositions[i].posicion;
          // @ts-ignore
          const marker = new google.maps.LatLng(firePos.lat, firePos.lon);
          fires.push(marker);
        }
      }

      // Create markers.
      for (let i = 0; i < fires.length; i++) {
        // @ts-ignore
        const marker = new google.maps.Marker({
          position: fires[i],
          icon: "fire.png",
          map: map.value,
        });
      }
    });

    return {
      currPos,
      mapDiv,
      fields,
      fieldsError,
      loadFields,
      loadRecords,
      records,
      recordsError,
      data,
      page,
      limit,
      totalCount,
      numPages,
    };
  },
  methods: {
    increasePage(n: number) {
      this.page = this.page + n < this.numPages ? this.page + n : this.numPages;
      this.loadRecords(this.page, this.limit);
    },
    decreasePage(n: number) {
      this.page = this.page - n > 1 ? this.page - n : 1;
      this.loadRecords(this.page, this.limit);
    },
  },
});
</script>

<template>
  <Header />
  <div class="mt-10 p-4" v-if="fields && records">
    <div>
      <h4>Mapa de incendios</h4>
      <div ref="mapDiv" class="w-full h-[500px]" />
    </div>

    <div class="text-center w-full" v-if="records != null">
      <div>Total de registros: {{ totalCount }}</div>
      <div>Página {{ page }} de {{ numPages }}</div>

      <NavigationButtons
        @decrease-page="(n) => decreasePage(n)"
        @increase-page="(n) => increasePage(n)"
      />
    </div>

    <div>
      <!-- <div v-for="(field, index) in fields" :key="index">
        {{ field.name }}
      </div> -->
      <DataTable :fields="fields" :records="records" />
    </div>
  </div>
</template>
