<template>
  <div>
    <Header />

    <div class="wrapper-layout">
      <slot>
        <router-view />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/shared/ui/layouts/Header.vue";
</script>

<style>
.wrapper-layout {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
