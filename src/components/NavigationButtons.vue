<script lang="ts">
import NavigationButton from "./NavigationButton.vue";

export default {
  name: "NavigationButtons",
  components: { NavigationButton },
};
</script>

<template>
  <div class="flex justify-center gap-2 flex-wrap">
    <NavigationButton @callback="$emit('decrease-page', 50)" label="-50" />
    <NavigationButton @callback="$emit('decrease-page', 10)" label="-10" />
    <NavigationButton @callback="$emit('decrease-page', 1)" label="<" />
    <NavigationButton @callback="$emit('increase-page', 1)" label=">" />
    <NavigationButton @callback="$emit('increase-page', 10)" label="+10" />
    <NavigationButton @callback="$emit('increase-page', 50)" label="+50" />
  </div>
</template>
