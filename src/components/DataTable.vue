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
        <tr>
          <td
            v-for="(field, index) in fields"
            class="border border-slate-400 p-2"
          >
            {{ index }}
          </td>
        </tr>
      </tbody>
    </table>
    Total de registros: {{ data.total_count }}
  </div>
</template>

<script lang="ts">
export default {
  name: "DataTable",
  props: {
    fields: [],
    data: [],
  },
};
</script>

<style></style>
