<template>
  <Header />
  <slot></slot>
  <o-btn :title="'hello'"></o-btn>
  <SButton></SButton>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
import Header from "@/app/layouts/Header.vue";
</script>
