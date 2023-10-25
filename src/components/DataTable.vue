<template>
  <div v-if="fields.length > 0">
    <table class="table-auto border-collapse">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            class="bg-zinc-300 border border-slate-400 p-2 text-sm align-top"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, i) in data.results" :key="i">
          <DataCell
            v-for="(field, j) in fields"
            :key="j"
            :data="record[field.name]"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import DataCell from "./DataCell.vue";

export default {
  name: "DataTable",
  components: { DataCell },
  props: {
    fields: null,
    data: null,
  },
};
</script>

<style></style>
