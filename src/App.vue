<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./components/Header.vue";
import DataTable from "./components/DataTable.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import { getFields, getRecords } from "./composables/fetchData";

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
