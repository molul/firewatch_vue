<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFields, useRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";
import InfoAndNavigation from "../components/InfoAndNavigation.vue";
import OpenLayersMapComp from "../components/OpenLayersMapComp.vue";
import MapInputs from "../components/MapInputs.vue";

//******************************************
// Records variables
//******************************************
const page = ref(1);
const limit = ref(50);
const provincia = ref("");
const situacion = ref("");
const nivel = ref("");
const causa = ref("");

const { loadFields } = useFields();
const { records, markers, totalCount, numPages, loadRecords } = useRecords();

//******************************************
// Records methods
//******************************************

//------------------------------------
// increasePage/decreasePage
//------------------------------------
// These functions update the "page" variable
// and queries the database again for a new load of records
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
const goToFirstPage = () => {
  page.value = 1;
  triggerLoadRecords();
};
const goToLastPage = () => {
  page.value = numPages.value;
  triggerLoadRecords();
};

//------------------------------------
// triggerLoadRecords
//------------------------------------
// Calls loadRecords again with the updated filters
//------------------------------------
const triggerLoadRecords = () => {
  loadRecords({
    page: page.value,
    limit: limit.value,
    provincia: provincia.value,
    situacion: situacion.value,
    nivel: nivel.value,
    causa: causa.value,
    radius: radiusKm.value,
    lat: latitud.value,
    lon: longitud.value,
  });
};

//------------------------------------
// updateFilters
//------------------------------------
// Updates the corresponding variable and triggers a new query
//------------------------------------
const updateFilters = (data: { field: string; value: string }) => {
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
};

//******************************************
// Google Maps variables
//******************************************
const radiusKm = ref(250);
const latitud = ref(41.4);
const longitud = ref(-4.25);
const center = ref({ lat: latitud.value, lng: longitud.value });

const circle = ref({
  center: center.value,
  radius: radiusKm.value * 1000,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
});

//******************************************
// Google Maps methods
//******************************************

//------------------------------------
// updateCircle
//------------------------------------
// Updates the circle drawn on the Google map
// when either radius, latitude or longitude
// have changed
//------------------------------------
const updateCircle = () => {
  center.value = {
    lat: +latitud.value,
    lng: +longitud.value,
  };

  circle.value = {
    center: {
      lat: +latitud.value,
      lng: +longitud.value,
    },
    radius: radiusKm.value * 1000,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  };
  // console.log(circle.value);
};

//------------------------------------
// handleUpdateRadiusAndCoordinates
//------------------------------------
// Updates the circle drawn on the Google map
// when either radius, latitude or longitude
// have changed, and queries the database
//------------------------------------
const handleUpdateRadiusAndCoordinates2 = (field: string, value: number) => {
  if (field === "radiusKm") {
    radiusKm.value = value;
  }
  if (field === "longitud") {
    longitud.value = value;
  }
  if (field === "latitud") {
    latitud.value = value;
  }

  updateCircle();
  triggerLoadRecords();
};

//******************************************
// OnMounted: loads fields and records after
// the component is mounted
//******************************************
onMounted(() => {
  loadFields();
  triggerLoadRecords();
});
</script>

<template>
  <div class="space-y-4 px-4">
    <div>
      <Title text="Mapa" />

      <!-- Filters -->
      <Filters @callback="(values) => updateFilters(values)" />

      <!-- Radius, latitud and longitude -->
      <MapInputs
        :radius-km="radiusKm"
        :longitud="longitud"
        :latitud="latitud"
        @callback="
          ({ name, value }) => {
            handleUpdateRadiusAndCoordinates2(name, value);
          }
        "
      />

      <!-- Info and navigation -->
      <InfoAndNavigation
        position="top"
        :page="page"
        :num-pages="numPages"
        :total-count="totalCount"
        @goToFirstPage="() => goToFirstPage()"
        @goToLastPage="() => goToLastPage()"
        @increasePage="(n) => increasePage(n)"
        @decreasePage="(n) => decreasePage(n)"
        :visible="records != null"
      />

      <!-- Map -->
      <OpenLayersMapComp
        :markers="markers"
        :center="center"
        :radiusKm="radiusKm"
      />

      <InfoAndNavigation
        position="bottom"
        :page="page"
        :num-pages="numPages"
        :total-count="totalCount"
        @goToFirstPage="() => goToFirstPage()"
        @goToLastPage="() => goToLastPage()"
        @increasePage="(n) => increasePage(n)"
        @decreasePage="(n) => decreasePage(n)"
        :visible="records != null"
      />
    </div>
  </div>
</template>
