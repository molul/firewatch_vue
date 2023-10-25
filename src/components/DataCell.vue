<template>
  <td class="border border-slate-400 p-2">
    {{ data ? data : "N/D" }}
  </td>
</template>

<script lang="ts">
export default {
  name: "DataTable",
  props: {
    data: null,
  },
};
</script>

<style></style>
