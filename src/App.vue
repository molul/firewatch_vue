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
      fields: null,
      data: null,
      page: ref(1),
      limit: 10,
      totalCount: 0,
      numPages: 0,
      apiURL:
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales",
    };
  },
  mounted() {
    this.getFields();
    this.getRecords();
  },

  methods: {
    getFields() {
      fetch(
        this.apiURL +
          "?timezone=UTC&include_links=false&include_app_metas=false"
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
        this.apiURL +
          "/records?order_by=fecha_inicio%20desc%2C%20hora_ini%20desc%2C%20provincia%20asc&limit=" +
          this.limit +
          "&offset=" +
          (this.page - 1) * 10 +
          "&timezone=UTC&include_links=false&include_app_metas=false"
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          this.data = data;
          this.totalCount = data.total_count;
          this.numPages = Math.ceil(data.total_count / 10);
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
  <div class="mt-10 p-4" v-if="fields && data">
    <div class="text-center w-full" v-if="data != null">
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
      <DataTable :fields="fields" :data="data" />
    </div>
  </div>
</template>
