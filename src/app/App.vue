<template>
  <div>
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from "@/shared/ui/layouts/Layout.vue";
</script>

<style>
.wrapper-layout {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
