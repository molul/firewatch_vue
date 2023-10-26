<template>
  <!-- {{ console.log(fields) }} -->
  <div v-if="fields.length > 0" class="">
    <table
      class="table-auto border-separate border-tools-table-outline rounded-md border-zinc-400 border-2"
    >
      <thead class="">
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            class="bg-zinc-600 text-white p-2 text-sm align-top"
            :class="{
              'rounded-tl-md': index === 0,
              'rounded-tr-md': index === fields.length - 1,
            }"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, i) in records" :key="i">
          <DataCell
            v-for="(field, j) in fields"
            :key="j"
            :data="record[field.name]"
            :fieldName="field.name"
            :class="{
              'rounded-bl-md': i === records.length - 1 && j === 0,
              'rounded-br-md':
                i === records.length - 1 && j === fields.length - 1,
            }"
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
    records: null,
  },
};
</script>

<style></style>
