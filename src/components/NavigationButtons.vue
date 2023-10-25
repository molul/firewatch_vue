<template>
  <div class="flex justify-center gap-4 my-4">
    <NavigationButton @callback="$emit('decrease-page', 10)" label="-10" />
    <NavigationButton @callback="$emit('decrease-page', 5)" label="-5" />
    <NavigationButton @callback="$emit('decrease-page', 1)" label="Anterior" />
    <NavigationButton @callback="$emit('increase-page', 1)" label="Siguiente" />
    <NavigationButton @callback="$emit('increase-page', 5)" label="+5" />
    <NavigationButton @callback="$emit('increase-page', 10)" label="+10" />
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
