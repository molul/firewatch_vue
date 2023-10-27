<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { useFields, useRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";
import { GoogleMap, Marker, CustomMarker, Circle } from "vue3-google-map";

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
    // reloadRecords
    //------------------------------------
    // Updates the corresponding variable and triggers a new query
    //------------------------------------
    const reloadRecords = (data: { field: string; value: string }) => {
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
      reloadRecords,
      triggerLoadRecords,
      nivel,
      causa,
      markers,
      circle,
      radiusKm,
      googleMapsKey,
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
      <Filters @callback="(values) => reloadRecords(values)" />

      <!-- Radius, latitud and longitude -->
      <div class="p-4 flex gap-8 justify-center">
        <div class="flex gap-2 items-center">
          <div>Radio</div>
          <div>
            <input
              class="p-2 rounded border border-zinc-400 w-20"
              type="text"
              ref="myInput"
              v-model="radiusKm"
              @input="() => handleUpdateRadiusAndCoordinates()"
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
              @input="() => handleUpdateRadiusAndCoordinates()"
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
              @input="() => handleUpdateRadiusAndCoordinates()"
            />
          </div>
        </div>
      </div>

      <!-- Info and navigation -->
      <div class="text-center w-full" v-if="records != null">
        <div class="flex flex-col items-center justify-between flex-wrap">
          <div>
            Página {{ page }} de {{ numPages }} - Total registros:
            {{ totalCount }}
          </div>

          <NavigationButtons
            @decrease-page="(n) => decreasePage(n)"
            @increase-page="(n) => increasePage(n)"
          />
        </div>
      </div>

      <!-- Map -->
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
  </div>
</template>
