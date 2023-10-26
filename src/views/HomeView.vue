<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { getFields, getRecords } from "../composables/fetchData";
import Title from "../components/Title.vue";
import Dropdown from "../components/Dropdown.vue";

export default defineComponent({
  name: "HomeView",
  components: { DataTable, NavigationButtons, Title, Dropdown },
  setup() {
    const data = null;
    const page = ref(1);
    const limit = ref(20);
    const selected = ref(0);

    const { fields, fieldsError, loadFields } = getFields();
    const { records, totalCount, numPages, recordsError, loadRecords } =
      getRecords();

    const increasePage = (n: number) => {
      page.value =
        page.value + n < numPages.value ? page.value + n : numPages.value;
      loadRecords(page.value, limit.value);
    };

    const decreasePage = (n: number) => {
      page.value = page.value - n > 1 ? page.value - n : 1;
      loadRecords(page.value, limit.value);
    };

    onMounted(() => {
      loadFields();
      loadRecords(1, limit.value);
    });

    return {
      selected,
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
      increasePage,
      decreasePage,
    };
  },
});
</script>

<template>
  <Title text="Incendios" />
  <div class="mt-10 p-4" v-if="fields && records">
    <div><Dropdown :selected="{ selected }" /></div>
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
        {{ field.name }}
      </div> -->
      <DataTable :fields="fields" :records="records" />
    </div>
  </div>
</template>
