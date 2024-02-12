<template>
  <Header v-if="route.path !== '/'"/>
  <slot></slot>
</template>

<script lang="ts" setup>
import Header from "@/app/layouts/Header.vue";
import {useRoute} from "vue-router";
const route = useRoute();
</script>
