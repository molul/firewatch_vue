<template>
  <div class="flex justify-center gap-2 my-4">
    <NavigationButton @callback="$emit('decrease-page', 50)" label="-50" />
    <NavigationButton @callback="$emit('decrease-page', 10)" label="-10" />
    <NavigationButton @callback="$emit('decrease-page', 1)" label="<" />
    <NavigationButton @callback="$emit('increase-page', 1)" label=">" />
    <NavigationButton @callback="$emit('increase-page', 10)" label="+10" />
    <NavigationButton @callback="$emit('increase-page', 50)" label="+50" />
  </div>
</template>

<script lang="ts">
import NavigationButton from "./NavigationButton.vue";

export default {
  name: "NavigationButtons",
  components: { NavigationButton },
};
</script>

<style></style>
