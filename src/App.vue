<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./components/Header.vue";
import DataTable from "./components/DataTable.vue";
import NavigationButtons from "./components/NavigationButtons.vue";

export default defineComponent({
  name: "App",
  components: { Header, DataTable, NavigationButtons },
  data() {
    return {
      fields: [],
      data: [],
      page: ref(1),
      limit: 10,
    };
  },
  mounted() {
    this.getFields();
    this.getRecords();
  },

  methods: {
    getFields() {
      fetch(
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales?timezone=UTC&include_links=false&include_app_metas=false"
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.fields);
          this.fields = data.fields;
          // return data.fields;
          // console.log(this.fields);
        })
        .catch((error) => console.log(error));
    },
    getRecords() {
      fetch(
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?limit=" +
          this.limit +
          "&offset=" +
          (this.page - 1) * 10 +
          "&timezone=UTC&include_links=false&include_app_metas=false"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.data = data;
          // return data.fields;
          // console.log(this.fields);
        })
        .catch((error) => console.log(error));
    },
    increasePage(n: number) {
      this.page += n;
      this.getRecords();
    },
    decreasePage(n: number) {
      this.page = this.page - n > 1 ? this.page - n : 1;
      this.getRecords();
    },
  },
});
</script>

<template>
  <Header />
  <!-- <button @click="getFields" class="bg-sky-600 p-2 text-white">
    Get fields
  </button> -->

  <div class="mt-10 p-4">
    <div class="text-center w-full">
      <div>Total de registros: {{ data.total_count }}</div>
      <div>Página {{ page }} de {{ Math.ceil(data.total_count / limit) }}</div>

      <NavigationButtons
        @decrease-page="(n) => decreasePage(n)"
        @increase-page="(n) => increasePage(n)"
      />
    </div>

    <div v-if="fields.length > 0">
      <!-- <div v-for="(field, index) in fields">
        {{ field.name }}
      </div> -->
      <DataTable :fields="fields" :data="data" />
    </div>
  </div>
</template>
