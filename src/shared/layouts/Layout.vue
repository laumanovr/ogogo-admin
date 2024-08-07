<template>
  <Header />
  <div class="wrapper-layout light">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Header } from "@/widgets/header";
</script>

<style scoped>
.wrapper-layout {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px 40px;
}
</style>
