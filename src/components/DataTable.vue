<template>
  <!-- {{ console.log(fields) }} -->
  <div v-if="fields.length > 0" class="">
    <table class="table-auto">
      <thead class="border-b border-zinc-700">
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            class="bg-white whitespace-nowrap text-zinc-700 px-4 py-3 text-sm align-top"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, i) in records"
          :key="i"
          :class="{
            'bg-opacity-50': i % 2 === 0,
            'bg-opacity-70': i % 2 === 1,
            'bg-red-400': record['situacion_actual'] === 'ACTIVO',
            'bg-orange-400': record['situacion_actual'] === 'CONTROLADO',
            'bg-green-400': record['situacion_actual'] === 'EXTINGUIDO',
          }"
        >
          <DataCell
            v-for="(field, j) in fields"
            :key="j"
            :data="record[field.name]"
            :fieldName="field.name"
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
