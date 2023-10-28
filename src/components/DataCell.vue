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
              return "[" + this.data.lon + ", " + this.data.lat + "]";
            } else {
              return this.data.join();
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return "-";
      }
    },
  },
};
</script>

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
