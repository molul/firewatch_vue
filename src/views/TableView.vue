<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import { useFields, useRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";
import InfoAndNavigation from "../components/InfoAndNavigation.vue";

//******************************************
// Records variables
//******************************************
const page = ref(1);
const limit = ref(20);
const provincia = ref("");
const situacion = ref("");
const nivel = ref("");
const causa = ref("");

const { fields, loadFields } = useFields();
const { records, totalCount, numPages, loadRecords } = useRecords();

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
</script>

<template>
  <div class="space-y-4 px-4">
    <Title text="Datos de incendios" />

    <!-- Filters -->
    <Filters @callback="(values) => reloadRecords(values)" />

    <!-- Info and navigation -->
    <InfoAndNavigation
      :page="page"
      :num-pages="numPages"
      :total-count="totalCount"
      @goToFirstPage="() => goToFirstPage()"
      @goToLastPage="() => goToLastPage()"
      @increasePage="(n) => increasePage(n)"
      @decreasePage="(n) => decreasePage(n)"
      :visible="records != null"
      position="top"
    />

    <!-- Table -->
    <DataTable
      :visible="fields != null && records != null"
      :fields="fields"
      :records="records"
    />

    <InfoAndNavigation
      :page="page"
      :num-pages="numPages"
      :total-count="totalCount"
      @goToFirstPage="() => goToFirstPage()"
      @goToLastPage="() => goToLastPage()"
      @increasePage="(n) => increasePage(n)"
      @decreasePage="(n) => decreasePage(n)"
      :visible="records != null"
      position="bottom"
    />
  </div>
</template>
