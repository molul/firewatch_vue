<script lang="ts">
import { defineComponent } from "vue";
import PageInfo from "./PageInfo.vue";
import NavigationButtons from "./NavigationButtons.vue";

export default defineComponent({
  name: "InfoAndNavigation",
  components: { NavigationButtons, PageInfo },
  props: {
    records: Object,
    page: Number,
    numPages: Number,
    totalCount: Number,
    visible: Boolean,
    position: String,
  },
});
</script>

<template>
  <div class="text-center w-full" v-if="visible">
    <div
      class="flex flex-col items-center justify-between flex-wrap space-y-2"
      :class="{ 'flex-col-reverse space-y-reverse': position === 'bottom' }"
    >
      <PageInfo :page="page" :num-pages="numPages" :total-count="totalCount" />
      <NavigationButtons
        @goToFirstPage="$emit('goToFirstPage')"
        @goToLastPage="$emit('goToLastPage')"
        @decreasePage="(n: number) => $emit('decreasePage', n)"
        @increasePage="(n: number) => $emit('increasePage', n)"
      />
    </div>
  </div>
</template>
