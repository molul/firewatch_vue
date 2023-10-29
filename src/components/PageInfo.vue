<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageInfo",
  props: {
    page: Number,
    numPages: Number,
    totalCount: Number,
  },
});
</script>

<template>
  <div>
    <div>
      Página {{ page }} de {{ numPages }} - Total registros:
      {{ totalCount }}
    </div>
  </div>
</template>
