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
  margin: 0 auto;
  padding: 0 40px 40px;
}
</style>
