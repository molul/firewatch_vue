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

    // @ts-ignore
    let markers: any[] = [];

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
      if (mapDiv) {
        // @ts-ignore
        map.value = new google.maps.Map(mapDiv.value, {
          center: currPos.value,
          zoom: 6,
        });

        const firePositions = toRaw(records.value) as any;

        if (firePositions && firePositions) {
          for (let i = 0; i < firePositions.length; i++) {
            const firePos = firePositions[i].posicion;
            // @ts-ignore
            const marker = new google.maps.LatLng(firePos.lat, firePos.lon);
            markers.push(marker);
          }
        }

        // Create markers.
        for (let i = 0; i < markers.length; i++) {
          // @ts-ignore
          const marker = new google.maps.Marker({
            position: markers[i],
            icon: "fire.png",
            map: map.value,
          });
        }
      } else {
        console.log("NULAZO");
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
      this.updateMap();
    },
    decreasePage(n: number) {
      this.page = this.page - n > 1 ? this.page - n : 1;
      this.loadRecords(this.page, this.limit);
    },
    updateMap() {
      if (this.records) {
        const records = this.records as any;
        const firePositions = toRaw(records);

        const fires = [];

        if (firePositions) {
          for (let i = 0; i < firePositions.length; i++) {
            const firePos = firePositions[i].posicion;
            if (firePos) {
              // @ts-ignore
              const marker = new google.maps.LatLng(firePos.lat, firePos.lon);
              fires.push(marker);
            }
          }
        }

        // Create markers.
        for (let i = 0; i < fires.length; i++) {
          console.log(firePositions);
          // @ts-ignore
          const marker = new google.maps.Marker({
            position: fires[i],
            icon: "fire.png",
            map: this.$refs.map,
          });
        }
      }
    },
  },
});
</script>

<template>
  <Header />
  <div class="mt-10 p-4" v-if="fields && records">
    <div>
      <h4 class="text-center text-5xl font-bold uppercase mb-8">
        Mapa de incendios
      </h4>
      <div ref="mapDiv" class="w-full h-[500px]" />
    </div>

    <div class="text-center w-full my-4" v-if="records != null">
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
