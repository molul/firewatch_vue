<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import DataTable from "./components/DataTable.vue";

export default defineComponent({
  name: "App",
  components: { Header, DataTable },
  data() {
    return {
      fields: [],
      data: [],
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
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?limit=10&offset=0&timezone=UTC&include_links=false&include_app_metas=false"
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
  },
});
</script>

<template>
  <Header />
  <button @click="getFields" class="bg-sky-600 p-2 text-white">
    Get fields
  </button>

  <div class="mt-10 p-4">
    <div v-if="fields.length > 0">
      <DataTable :fields="fields" :data="data" />
    </div>
  </div>
</template>
