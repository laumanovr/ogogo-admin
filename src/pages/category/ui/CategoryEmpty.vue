<template>
  <div class="category-empty-main-wrapper">
    <EmptyData
      :buttonTitle="$t('lang-474c7de3-c095-4ac4-b222-2cf17b6d5343')"
      :text="$t('lang-7babf884-8348-4db5-a9ef-8949135af72f')"
      @onClick="onCategoryClick"
    />
  </div>
</template>

<script lang="ts" setup>
import EmptyData from "@/features/EmptyData.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onCategoryClick = () => {
  router.push("/category");
};
</script>

<style scoped></style>
