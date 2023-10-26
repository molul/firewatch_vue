<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { getFields, getRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Filters from "../components/Filters.vue";

export default defineComponent({
  name: "HomeView",
  components: { DataTable, NavigationButtons, Title, Filters },
  setup() {
    const data = null;
    const page = ref(1);
    const limit = ref(20);
    const provincia = ref("");
    const situacion = ref("");

    const { fields, fieldsError, loadFields } = getFields();
    const { records, totalCount, numPages, recordsError, loadRecords } =
      getRecords();

    const increasePage = (n: number) => {
      page.value =
        page.value + n < numPages.value ? page.value + n : numPages.value;
      loadRecords({
        page: page.value,
        limit: limit.value,
        provincia: provincia.value,
        situacion: situacion.value,
      });
    };

    const decreasePage = (n: number) => {
      page.value = page.value - n > 1 ? page.value - n : 1;
      loadRecords({
        page: page.value,
        limit: limit.value,
        provincia: provincia.value,
        situacion: situacion.value,
      });
    };

    const reloadRecords = (data: { field: string; value: string }) => {
      // console.log("data ", data);
      if (data.field === "provincia") {
        provincia.value = data.value;
        // console.log(provincia.value);
      }
      if (data.field === "situacion_actual") {
        situacion.value = data.value;
        // console.log(situacion.value);
      }
      loadRecords({
        page: page.value,
        limit: limit.value,
        provincia: provincia.value,
        situacion: situacion.value,
      });
      // console.log("qweqweqwe");
    };

    onMounted(() => {
      loadFields();
      loadRecords({
        page: page.value,
        limit: limit.value,
        provincia: provincia.value,
        situacion: situacion.value,
      });
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
    };
  },
});
</script>

<template>
  <Title text="Incendios" />
  <div class="mt-10 p-4" v-if="fields && records">
    <div>
      <Filters @callback="(values) => reloadRecords(values)" />
    </div>
    <div class="text-center w-full" v-if="records != null">
      <div class="flex items-center justify-between flex-wrap">
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

    <div class="overflow-scroll">
      <!-- <div v-for="(field, index) in fields" :key="index">
        {{ field }}
      </div> -->
      <DataTable :fields="fields" :records="records" />
    </div>
  </div>
</template>
