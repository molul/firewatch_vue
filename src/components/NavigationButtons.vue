<script lang="ts">
import NavigationButton from "./NavigationButton.vue";

export default {
  name: "NavigationButtons",
  components: { NavigationButton },
};
</script>

<template>
  <div class="flex justify-center gap-2 flex-wrap">
    <NavigationButton
      @callback="$emit('goToFirstPage')"
      icon="ic:round-first-page"
    />
    <NavigationButton @callback="$emit('decreasePage', 20)" label="-20" />
    <NavigationButton
      @callback="$emit('decreasePage', 1)"
      icon="ic:round-navigate-before"
    />
    <NavigationButton
      @callback="$emit('increasePage', 1)"
      icon="ic:round-navigate-next"
    />
    <NavigationButton @callback="$emit('increasePage', 20)" label="+20" />
    <NavigationButton
      @callback="$emit('goToLastPage', 50)"
      icon="ic:round-last-page"
    />
  </div>
</template>
