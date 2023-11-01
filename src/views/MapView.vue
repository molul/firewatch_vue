<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { useFields, useRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";
import InfoAndNavigation from "../components/InfoAndNavigation.vue";
import GoogleMapComp from "../components/GoogleMapComp.vue";
import MapValueInput from "../components/MapValueInput.vue";
import FireMarker from "../components/FireMarker.vue";
import OpenLayersMapComp from "../components/OpenLayersMapComp.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DataTable,
    NavigationButtons,
    Title,
    Filters,
    InfoAndNavigation,
    GoogleMapComp,
    MapValueInput,
    FireMarker,
    OpenLayersMapComp,
  },
  setup() {
    //******************************************
    // Records variables
    //******************************************
    const data = null;
    const page = ref(1);
    const limit = ref(20);
    const provincia = ref("");
    const situacion = ref("");
    const nivel = ref("");
    const causa = ref("");

    const { fields, fieldsError, loadFields } = useFields();
    const {
      records,
      markers,
      totalCount,
      numPages,
      recordsError,
      loadRecords,
    } = useRecords();

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
    const handleUpdateRadiusAndCoordinates = () => {
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
      updateFilters,
      triggerLoadRecords,
      nivel,
      causa,
      markers,
      circle,
      radiusKm,
      updateCircle,
      handleUpdateRadiusAndCoordinates,
      latitud,
      longitud,
      center,
    };
  },
});
</script>

<template>
  <div class="space-y-4 px-4">
    <div>
      <Title text="Mapa" />

      <!-- Filters -->
      <Filters @callback="(values) => updateFilters(values)" />

      <!-- Radius, latitud and longitude -->
      <div class="p-4 flex flex-col md:flex-row gap-4 justify-center">
        <MapValueInput
          label="Radio"
          v-model="radiusKm"
          @input="handleUpdateRadiusAndCoordinates()"
        />
        <MapValueInput
          label="Longitud"
          v-model="longitud"
          @input="handleUpdateRadiusAndCoordinates()"
        />
        <MapValueInput
          label="Latitud"
          v-model="latitud"
          @input="handleUpdateRadiusAndCoordinates()"
        />
      </div>

      <!-- Info and navigation -->
      <InfoAndNavigation
        position="top"
        :page="page"
        :num-pages="numPages"
        :total-count="totalCount"
        @increase-page="(n) => increasePage(n)"
        @decrease-page="(n) => decreasePage(n)"
        :visible="records != null"
      />

      <!-- Map -->
      <OpenLayersMapComp
        :markers="markers"
        :center="center"
        :radiusKm="radiusKm"
      />
      <!-- <div class="py-4">
        <ol-map
          :loadTilesWhileAnimating="true"
          :loadTilesWhileInteracting="true"
          style="height: 400px"
        >
          <ol-view
            ref="view"
            :center="[-4, 41]"
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
      </div> -->
      <!-- 
      <GoogleMapComp
        :circle="circle"
        :markers="markers"
        :center="center"
        :radiusKm="radiusKm.toString()"
      /> -->

      <InfoAndNavigation
        position="bottom"
        :page="page"
        :num-pages="numPages"
        :total-count="totalCount"
        @increase-page="(n) => increasePage(n)"
        @decrease-page="(n) => decreasePage(n)"
        :visible="records != null"
      />
    </div>
  </div>
</template>
