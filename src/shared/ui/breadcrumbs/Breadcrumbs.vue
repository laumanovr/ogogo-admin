<template>
  <div class="breadcrumbs-container">
    <div class="breadcrumb-item" v-for="(item, i) in items" :key="i">
      <router-link :to="item.link">{{ item.name }}</router-link>
      <span v-show="i !== items.length - 1">/</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, PropType } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

let items = reactive(props.items);
</script>

<style scoped lang="scss">
.breadcrumbs-container {
  display: flex;
  .breadcrumb-item {
    display: flex;
    font-weight: 600;
    font-size: 16px;
    a {
      text-decoration: none;
      color: #000;
    }
    span {
      margin: 0 6px;
    }
  }
}
</style>
