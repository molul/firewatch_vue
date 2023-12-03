<script lang="ts">
import DataCell from "./DataCell.vue";

export default {
  name: "DataTable",
  components: { DataCell },
  props: {
    fields: null,
    records: null,
    visible: Boolean,
  },
};
</script>

<template>
  <div v-if="visible" class="overflow-x-scroll">
    <div v-if="fields.length > 0" class="">
      <table class="table-auto rounded-md overflow-hidden">
        <thead class="border-b border-zinc-700">
          <tr class="">
            <th
              v-for="(field, index) in fields"
              :key="index"
              class="bg-zinc-600 whitespace-nowrap text-white px-4 py-3 text-sm align-top uppercase"
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
              'bg-red-500 text-white': record['situacion_actual'] === 'ACTIVO',
              'bg-amber-300': record['situacion_actual'] === 'CONTROLADO',
              'bg-green-300': record['situacion_actual'] === 'EXTINGUIDO',
            }"
          >
            <DataCell
              v-for="(field, j) in fields"
              :key="j"
              :data="record[field.name]"
              :fieldName="field.name"
              class="bg-black"
              :class="{
                'bg-opacity-5': i % 2 === 0,
                'bg-opacity-10': i % 2 === 1,
              }"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
