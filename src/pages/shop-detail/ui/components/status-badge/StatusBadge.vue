<template>
  <div class="status-badge">
    <div>{{ props.status }}</div>
    <div>{{ props.text }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  status: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
});
</script>

<style scoped lang="scss">
@import "styles";
</style>
