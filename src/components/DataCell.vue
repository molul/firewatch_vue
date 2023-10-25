<template>
  <td class="border border-slate-400 p-2 text-sm">
    {{ formattedData ? formattedData : "-" }}
  </td>
</template>

<script lang="ts">
export default {
  name: "DataTable",
  props: {
    data: null,
  },
  computed: {
    formattedData() {
      if (this.data) {
        if (this.data && typeof this.data === "string") {
          return this.data;
        } else if (this.data != null && typeof this.data === "object") {
          return this.data.join();
        }
      } else {
        return "-";
      }
    },
  },
};
</script>

<style></style>
