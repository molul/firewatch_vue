<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { getFields, getRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";
import { GoogleMap, Marker, CustomMarker, Circle } from "vue3-google-map";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DataTable,
    NavigationButtons,
    Title,
    Filters,
    GoogleMap,
    Marker,
    Circle,
    CustomMarker,
    NavBar,
  },
  setup() {
    //------------------------------------
    // Records variables
    //------------------------------------
    const data = null;
    const page = ref(1);
    const limit = ref(20);
    const provincia = ref("");
    const situacion = ref("");
    const nivel = ref("");
    const causa = ref("");
    const viewMode = ref("map");

    const { fields, fieldsError, loadFields } = getFields();
    const { records, totalCount, numPages, recordsError, loadRecords } =
      getRecords();

    //------------------------------------
    // Records methods
    //------------------------------------
    const increasePage = (n: number) => {
      page.value =
        page.value + n < numPages.value ? page.value + n : numPages.value;
      triggerLoadRecords();
    };

    const decreasePage = (n: number) => {
      page.value = page.value - n > 1 ? page.value - n : 1;
      triggerLoadRecords();
    };

    const triggerLoadRecords = () => {
      loadRecords({
        page: page.value,
        limit: limit.value,
        provincia: provincia.value,
        situacion: situacion.value,
        nivel: nivel.value,
        causa: causa.value,
      });
    };

    const reloadRecords = (data: { field: string; value: string }) => {
      // console.log("data ", data);
      if (data.field === "provincia") {
        provincia.value = data.value;
      }
      if (data.field === "situacion_actual") {
        situacion.value = data.value;
      }
      if (data.field === "nivel_maximo_alcanzado") {
        nivel.value = data.value;
      }
      if (data.field === "causa_probable") {
        causa.value = data.value;
      }
      triggerLoadRecords();
      // console.log("qweqweqwe");
    };

    onMounted(() => {
      loadFields();
      triggerLoadRecords();
    });

    //------------------------------------
    // Google Maps variables
    //------------------------------------
    const markers = ref(null);

    const radiusKm = ref(10);
    const latitud = ref(41.4);
    const longitud = ref(-4.25);
    const center = ref({ lat: latitud.value, lng: longitud.value });
    const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const circle = ref({
      center: center.value,
      radius: radiusKm.value * 1000,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    //------------------------------------
    // Records methods
    //------------------------------------
    const updateCircle = () => {
      circle.value = {
        center: { lat: +latitud.value, lng: +longitud.value },
        radius: radiusKm.value * 1000,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      };
    };

    //------------------------------------
    // Other methods
    //------------------------------------
    const switchMode = (mode: string) => {
      console.log(mode);
      viewMode.value = mode;
    };

    return {
      fields,
      fieldsError,
      loadFields,
      loadRecords,
      records,
      recordsError,
      data,
      page,
      limit,
      provincia,
      situacion,
      totalCount,
      numPages,
      increasePage,
      decreasePage,
      reloadRecords,
      triggerLoadRecords,
      nivel,
      causa,
      markers,
      circle,
      radiusKm,
      googleMapsKey,
      updateCircle,
      latitud,
      longitud,
      center,
      viewMode,
      switchMode,
    };
  },
});
</script>

<template>
  <div class="space-y-4 px-4">
    <!-- Filters -->
    <div>
      <Filters @callback="(values) => reloadRecords(values)" />
    </div>

    <!-- Info and navigation -->
    <div class="text-center w-full" v-if="records != null">
      <div class="flex flex-col items-center justify-between flex-wrap">
        <div>
          {{ 1 + limit * (page - 1) }} Página {{ page }} de {{ numPages }} -
          Total registros:
          {{ totalCount }}
        </div>

        <NavigationButtons
          @decrease-page="(n) => decreasePage(n)"
          @increase-page="(n) => increasePage(n)"
        />
      </div>
    </div>

    <!-- View mode -->
    <NavBar @callback="(mode) => switchMode(mode)" :current="viewMode" />

    <!-- Map -->
    <div v-show="viewMode === 'map'">
      <Title text="Mapa" />
      <div class="p-4 flex gap-8 justify-center">
        <div class="flex gap-2 items-center">
          <div>Radio</div>
          <div>
            <input
              class="p-2 rounded border border-zinc-400 w-20"
              type="text"
              ref="myInput"
              v-model="radiusKm"
              @input="updateCircle"
            />
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>Longitud</div>
          <div>
            <input
              class="p-2 rounded border border-zinc-400 w-20"
              type="text"
              ref="myInput"
              v-model="longitud"
              @input="updateCircle"
            />
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <div>Latitud</div>
          <div>
            <input
              class="p-2 rounded border border-zinc-400 w-20"
              type="text"
              ref="myInput"
              v-model="latitud"
              @input="updateCircle"
            />
          </div>
        </div>
      </div>
      <GoogleMap
        :api-key="googleMapsKey"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="6.5"
      >
        <Circle :options="circle" />
        <CustomMarker
          :options="{
            position: center,
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

    <!-- Table -->
    <div class="">
      <Title text="Datos de incendios" />
      <div class="" v-if="fields && records">
        <div class="overflow-scroll">
          <!-- <div v-for="(field, index) in fields" :key="index">
            {{ field }}
          </div> -->
          <DataTable :fields="fields" :records="records" />
        </div>
      </div>
    </div>
  </div>
</template>
