<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, ref, computed, onMounted } from "vue";
import Header from "./components/Header.vue";
import DataTable from "./components/DataTable.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import { getFields, getRecords } from "./composables/fetchData";
import { useGeolocation } from "./composables/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";

export default defineComponent({
  name: "App",
  components: { Header, DataTable, NavigationButtons },
  setup() {
    const { coords } = useGeolocation();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });
    const mapDiv = ref(null);
    // let map = ref(null);
    onMounted(async () => {
      await loader.load();
      // @ts-ignore
      const map = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7,
      });
      // @ts-ignore
      new google.maps.Marker({
        position: currPos.value,
        map,
        title: "Hello World!",
      });
    });
    // console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    const data = null;
    const page = ref(1);
    const limit = 50;

    const { fields, fieldsError, loadFields } = getFields();
    const { records, totalCount, numPages, recordsError, loadRecords } =
      getRecords();

    loadFields();
    loadRecords(1, limit);

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
    <img src="./assets/fire.png" />

    <div>
      <h4>Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}
      <div ref="mapDiv" style="width: 100%; height: 80vh" />
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
