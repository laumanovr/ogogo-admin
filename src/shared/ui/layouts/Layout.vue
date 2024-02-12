<template>
  <Header />

  <div class="wrapper-layout">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/shared/ui/layouts/Header.vue";
</script>

<style>
.wrapper-layout {
  max-width: 1440px;
}
</style>
