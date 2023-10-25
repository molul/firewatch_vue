<template>
  <td class="border border-slate-400 p-2 text-sm" :class="className">
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
    className() {
      if (this.fieldName === "situacion_actual") {
        if (this.data === "ACTIVO") return "bg-red-400";
        if (this.data === "CONTROLADO") return "bg-yellow-400";
        if (this.data === "EXTINGUIDO") return "bg-green-400";
      }
      return "";
    },
    formattedData() {
      if (this.data) {
        try {
          if (this.data && typeof this.data === "string") {
            return this.data;
          } else if (this.data != null && typeof this.data === "object") {
            if (this.data.lon) {
              return "LON: " + this.data.lon + " - LAT: " + this.data.lat;
            } else {
              return this.data.join();
            }
          }
        } catch (error) {
          console.log(JSON.stringify(this.data));
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
