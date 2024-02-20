<template>
  <component :is="currentComponent">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import "@/app/style/colors.scss";
import Layout from "@/shared/ui/layouts/Layout.vue";
import Empty from "@/shared/ui/layouts/Empty.vue";
import { computed } from "vue";

const isLoggedIn = true;
const currentComponent = computed(() => {
  if (isLoggedIn) {
    return Layout;
  } else {
    return Empty;
  }
});
</script>
