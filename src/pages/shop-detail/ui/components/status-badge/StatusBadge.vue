<template>
  <div class="status-badge" :class="activeClass">
    <div class="status-text">{{ props.statusText }}</div>
    <div>{{ props.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PRODUCT_VERIFICATION_STATUS } from "@/entities/shop";
import { computed } from "vue";

const props = defineProps({
  status: {
    type: Number,
    default: null,
  },
  statusText: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

const activeClass = computed(() => {
  if (props.status === PRODUCT_VERIFICATION_STATUS.ACCEPTED) {
    return "success";
  } else if (props.status === PRODUCT_VERIFICATION_STATUS.REJECTED) {
    return "rejected";
  }
});
</script>

<style scoped lang="scss">
@import "styles";
</style>
