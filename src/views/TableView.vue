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
    const { records, totalCount, numPages, recordsError, loadRecords } =
      useRecords();

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
    };
  },
});
</script>

<template>
  <div class="space-y-4 px-4">
    <Title text="Datos de incendios" />
    <!-- Filters -->
    <Filters @callback="(values) => reloadRecords(values)" />

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

    <!-- Table -->
    <div v-if="fields && records" class="overflow-scroll">
      <DataTable :fields="fields" :records="records" />
    </div>
  </div>
</template>
