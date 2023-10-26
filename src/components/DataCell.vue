<template>
  <td
    class="p-2 text-sm"
    :class="{
      'whitespace-nowrap': fieldName === 'posicion',
    }"
  >
    {{ formattedData ? formattedData : "-" }}
  </td>
</template>

<script lang="ts">
export default {
  name: "DataTable",
  props: {
    data: null,
    fieldName: null,
  },
  computed: {
    formattedData() {
      if (this.data) {
        try {
          if (this.data && typeof this.data === "string") {
            return this.data;
          } else if (this.data != null && typeof this.data === "object") {
            if (this.data.lon) {
              const lon = Math.round(this.data.lon * 100) / 100;
              const lat = Math.round(this.data.lat * 100) / 100;
              return "[" + lon + ", " + lat + "]";
            } else {
              return this.data.join();
            }
          }
        } catch (error) {
          // console.log(JSON.stringify(this.data));
          console.log(error);
        }
      } else {
        return "-";
      }
    },
  },
};
</script>

<style></style>
